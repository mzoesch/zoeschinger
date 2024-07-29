from pathlib import Path
import sqlite3
import functools as ft
import csv
import pandas as pd
import time


def log_time_v2(func):
    NEXT_LINERS: list[str] = [
        '__init__',
        'initialise_offer_table',
    ]

    @ft.wraps(func)
    def wrapper(*args, **kwargs):
        index: int = kwargs.get('index', None)
        start: float = time.time()
        end: str = '\n' if func.__name__ in NEXT_LINERS else ' '
        if index is not None:
            print(
                f'{func.__name__}_{index} . . .', end=end
            )
        else:
            print(f'{func.__name__} . . .', end=end)
        result = func(*args, **kwargs)
        if func.__name__ in NEXT_LINERS:
            print(
                f'{func.__name__} . . . Ok in {round(time.time() - start, 2)}s', end=end)
            return result

        print(f'Ok in {round(time.time() - start, 2)}s.', end='\n')
        return result

    return wrapper


class Data:

    # region db column names

    # region hotels

    HOTEL_TABLE_NAME: str = 'hotels'

    TH_HOTEL_ID: str = 'hotelid'
    TH_HOTEL_NAME: str = 'hotelname'
    TH_HOTEL_STAR_RATING: str = 'hotelstars'

    # endregion

    # region offers

    OFFER_TABLE_NAME: str = 'offers'

    TO_PK: str = 'offerid'
    TO_HOTEL_ID: str = 'hotelid'
    TO_OUTBOUND_DEPARTURE_DATE_TIME: str = 'outbounddeparturedatetime'
    TO_INBOUND_DEPARTURE_DATE_TIME: str = 'inbounddeparturedatetime'
    TO_COUNT_ADULTS: str = 'countadults'
    TO_COUNT_CHILDREN: str = 'countchildren'
    TO_PRICE: str = 'price'
    TO_INBOUND_DEPARTURE_AIRPORT: str = 'inbounddepartureairport'
    TO_OUTBOUND_ARRIVAL_AIRPORT: str = 'outboundarrivalairport'
    TO_INBOUND_ARRIVAL_DATE_TIME: str = 'inboundarrivaldatetime'
    TO_OUTBOUND_DEPARTURE_AIRPORT: str = 'outbounddepartureairport'
    TO_INBOUND_ARRIVAL_AIRPORT: str = 'inboundarrivalairport'
    TO_OUTBOUND_ARRIVAL_DATE_TIME: str = 'outboundarrivaldatetime'
    TO_MEALTYPE: str = 'mealtype'
    TO_OCEANVIEW: str = 'oceanview'
    TO_ROOMTYPE: str = 'roomtype'
    TO_START_DATE_INT: str = 'startdateasint'

    # endregion

    # endregion

    @log_time_v2
    def __init__(self, root_file: str, dev_mode: bool = False) -> None:
        self._root_file: Path = Path(root_file)
        # self._data_offers: Path = self._root_file.parent / \
        #     'data' / 'c24hc' / 'offers.csv'
        self._data_offers: Path = self._root_file.parent / \
            'data' / 'c24hc' / 'split_offers_0.csv'
        self._data_hotels: Path = self._root_file.parent / 'data' / 'c24hc' / 'hotels.csv'
        self._db_path: Path = self._root_file.parent / 'data' / 'c24hc' / 'db.db'

        self._path_to_sample_hotel_img_dir: Path = self._root_file.parent / \
            'public' / 'mock_hotel_pics'

        if dev_mode:
            self._delete_db()

        created_new_db: bool = not self._db_path.exists()
        self._con: sqlite3.Connection = sqlite3.connect(self._db_path)
        if self._con is None:
            raise Exception('Could not connect to database.')
        self._cur: sqlite3.Cursor = self._con.cursor()
        if self._cur is None:
            raise Exception('Could not create cursor.')

        if dev_mode or created_new_db:
            self._initial_setup()

        self._con.close()

        return None

    @property
    def path_to_sample_hotel_img_dir(self) -> Path:
        return self._path_to_sample_hotel_img_dir

    def _db_login(self) -> None:
        self._con = sqlite3.connect(self._db_path)
        self._cur = self._con.cursor()
        return None

    def _db_logout(self) -> None:
        self._con.close()
        return None

    @log_time_v2
    def _delete_db(self) -> None:
        """Delete the database file."""

        if self._db_path.exists():
            self._db_path.unlink()

        return None

    @staticmethod
    def _convert_str_date_to_bit_date(in_str: str) -> str:
        """
        In order to save some bits we subtract 2_000 from the input year.
        Works until: 2127-12-31.

        00 0000   <- 5 bit day
        0000      <- 4 bit month  /// 9 bit
        000 0000  <- 7 bit year   /// 16 bit

        Example:

        year,       month,      day
        000 0000    0000        00 0000

        2024,       January,    1
        1 1000      0001        0 0001
        """

        def deserialize(string: str) -> list[int]:
            """
            :param string: 2020-10-05
            :return: [year, month, day]
            """
            if len(string.split("-")) != 3:
                raise ValueError("Invalid Date.")

            return [
                int(_)
                for _ in
                string.split("-")
            ]
        
        year, month, day = deserialize(in_str)

        year -= 2_000

        if year < 0x0 or year > 0b1111111:
            raise ValueError(f"Year is out of bounds: {year + 2_000 = }.")
        if month > 0b1111:
            raise ValueError(f"Month is out of bounds: {month}")
        if day > 0b11111:
            raise ValueError(f"Day is out of bounds: {day}")

        bit_16: int = 0

        bit_16 += year
        bit_16 = bit_16 << 4
        bit_16 += month
        bit_16 = bit_16 << 5
        bit_16 += day

        return bit_16
    
    def _initial_setup(self) -> None:

        @log_time_v2
        def initialise_hotel_table() -> None:
            sql: str = '\
CREATE TABLE IF NOT EXISTS {} (\
    {} INTEGER PRIMARY KEY,\
    {} TEXT NOT NULL,\
    {} INTEGER NOT NULL\
);\
            '.format(
                Data.HOTEL_TABLE_NAME,
                Data.TH_HOTEL_ID,
                Data.TH_HOTEL_NAME,
                Data.TH_HOTEL_STAR_RATING
            )
            self._cur.execute(sql)

            sql: str = '\
INSERT INTO {} ({}, {}, {})\
VALUES (?, ?, ?);\
            '.format(
                Data.HOTEL_TABLE_NAME,
                Data.TH_HOTEL_ID,
                Data.TH_HOTEL_NAME,
                Data.TH_HOTEL_STAR_RATING
            )
            with open(self._data_hotels, 'r') as f:
                dr: csv.DictReader = csv.DictReader(f, delimiter=';')
                to_db: list[tuple] = [
                    (
                        i[Data.TH_HOTEL_ID],
                        i[Data.TH_HOTEL_NAME],
                        i[Data.TH_HOTEL_STAR_RATING]
                    )
                    for i in dr
                ]
            self._cur.executemany(sql, to_db)
            self._con.commit()

            return None

        @log_time_v2
        def initialise_offer_table() -> None:

            @log_time_v2
            def process_chunk(chunk: pd.DataFrame, index: int) -> None:
                chunk.to_sql(
                    Data.OFFER_TABLE_NAME,
                    self._con,
                    if_exists='append',
                    index=True,
                    index_label=Data.TO_PK
                )

                return None

            sql: str = '\
CREATE TABLE IF NOT EXISTS {} (\
    {} INTEGER PRIMARY KEY,\
    {} INTEGER NOT NULL,\
    {} TEXT NOT NULL,\
    {} TEXT NOT NULL,\
    {} INTEGER NOT NULL,\
    {} INTEGER NOT NULL,\
    {} INTEGER NOT NULL,\
    {} TEXT NOT NULL,\
    {} TEXT NOT NULL,\
    {} TEXT NOT NULL,\
    {} TEXT NOT NULL,\
    {} TEXT NOT NULL,\
    {} TEXT NOT NULL,\
    {} TEXT NOT NULL,\
    {} TEXT NOT NULL,\
    {} TEXT NOT NULL\
);\
            '.format(
                Data.OFFER_TABLE_NAME,
                Data.TO_PK,
                Data.TO_HOTEL_ID,
                Data.TO_OUTBOUND_DEPARTURE_DATE_TIME,
                Data.TO_INBOUND_DEPARTURE_DATE_TIME,
                Data.TO_COUNT_ADULTS,
                Data.TO_COUNT_CHILDREN,
                Data.TO_PRICE,
                Data.TO_INBOUND_DEPARTURE_AIRPORT,
                Data.TO_OUTBOUND_ARRIVAL_AIRPORT,
                Data.TO_INBOUND_ARRIVAL_DATE_TIME,
                Data.TO_OUTBOUND_DEPARTURE_AIRPORT,
                Data.TO_INBOUND_ARRIVAL_AIRPORT,
                Data.TO_OUTBOUND_ARRIVAL_DATE_TIME,
                Data.TO_MEALTYPE,
                Data.TO_OCEANVIEW,
                Data.TO_ROOMTYPE,
            )
            self._cur.execute(sql)

            # Adjust chunksize to your memory constraints
            chunk: pd.core.frame.DataFrame
            for i, chunk in enumerate(
                    pd.read_csv(
                        self._data_offers, chunksize=7_500_000, delimiter=','
                    )
            ):
                chunk: pd.core.frame.DataFrame = chunk
                
                # # 2023-02-05T11:45:00+00:00
                # DATE_LEN: int = 10
                # Data._convert_str_date_to_bit_date(chunk[Data.TO_INBOUND_DEPARTURE_DATE_TIME][:DATE_LEN])

                # # TODO Here add the new column (start date as int)
                # # chunk.add(my new row)
                # chunk.

                process_chunk(chunk, index=i)

                continue

            return None

        initialise_hotel_table()
        initialise_offer_table()

        return None

    @log_time_v2
    @ft.lru_cache(maxsize=5)
    def get_cheapest_offers(self, limit: int = 10) -> list[dict]:
        """
        @param limit: The number of offers to return at most.
        @return: [(offerid, hotelid), ...]
        """
        sql: str = '\
SELECT {}, {} FROM {} \
ORDER BY {} ASC \
LIMIT {};\
        '.format(
            Data.TO_PK,
            Data.TO_HOTEL_ID,
            Data.OFFER_TABLE_NAME,
            Data.TO_PRICE,
            limit
        )

        self._db_login()
        self._cur.execute(sql)
        rows: list[tuple] = self._cur.fetchall()
        self._db_logout()

        return rows
    
    def _validate_matching_offer_req(
        self,
        *,
        duration: int,
        earliest_departure_date: str,
        latest_departure_date: str,
        count_adults: int,
        count_children: int,
        departure_airports: list[str],
        limit: int = 10
    ) -> bool:
        if (count_adults < 1):
            return False
        
        if (count_children < 0):
            return False
        
        if (duration < 1):
            return False
    
        return True

    @log_time_v2
    # @ft.lru_cache(maxsize=20)
    def get_matching_offers(
        self,
        /,
        limit:int = 10,
        *,
        duration: int,
        earliest_departure_date: str,
        latest_departure_date: str,
        count_adults: int,
        count_children: int,
        departure_airports: list[str]
    ) -> list[dict]:
        """
        @return: [(offerid, hotelid), ...]
        """

        if (self._validate_matching_offer_req(
            duration=duration,
            earliest_departure_date=earliest_departure_date,
            latest_departure_date=latest_departure_date,
            count_adults=count_adults,
            count_children=count_children,
            departure_airports=departure_airports
        ) == False):
            print("Invalid request. Ignoring.")
            return []

        print(duration)
        print(earliest_departure_date)
        print(latest_departure_date)
        print(count_adults)
        print(count_children)
        print(departure_airports)
        print(limit)

        sql: str = '\
SELECT {}, {} FROM {} \
LIMIT {} \
        '.format(
            Data.TO_PK,
            Data.TO_HOTEL_ID,
            Data.OFFER_TABLE_NAME,
            limit
        )
        
        self._db_login()
        self._cur.execute(sql)
        rows: list[tuple] = self._cur.fetchall()
        self._db_logout()

        return rows
        
    @log_time_v2
    @ft.lru_cache(maxsize=10)
    def get_hotel_information(self, hotelid: int) -> dict:
        sql: str = '\
SELECT {}, {}, {} FROM {} \
WHERE {} = ? \
LIMIT 1;\
        '.format(
            Data.TH_HOTEL_ID,
            Data.TH_HOTEL_NAME,
            Data.TH_HOTEL_STAR_RATING,
            Data.HOTEL_TABLE_NAME,
            Data.TH_HOTEL_ID
        )

        self._db_login()
        self._cur.execute(sql, (hotelid,))
        row: tuple = self._cur.fetchone()
        self._db_logout()

        return {
            Data.TH_HOTEL_ID: row[0],
            Data.TH_HOTEL_NAME: row[1],
            Data.TH_HOTEL_STAR_RATING: row[2]
        }

    @log_time_v2
    @ft.lru_cache(maxsize=5)
    def get_offer_information(self, offerid: int) -> dict | None:
        sql: str = '\
SELECT * FROM {} \
WHERE {} = ? \
LIMIT 1;\
        '.format(
            Data.OFFER_TABLE_NAME,
            Data.TO_PK
        )

        self._db_login()
        self._cur.execute(sql, (offerid,))
        row: tuple = self._cur.fetchone()
        self._db_logout()

        if row is None:
            return None

        return {
            Data.TO_PK: row[0],
            Data.TO_HOTEL_ID: row[1],
            Data.TO_OUTBOUND_DEPARTURE_DATE_TIME: row[2],
            Data.TO_INBOUND_DEPARTURE_DATE_TIME: row[3],
            Data.TO_COUNT_ADULTS: row[4],
            Data.TO_COUNT_CHILDREN: row[5],
            Data.TO_PRICE: row[6],
            Data.TO_INBOUND_DEPARTURE_AIRPORT: row[7],
            Data.TO_OUTBOUND_ARRIVAL_AIRPORT: row[8],
            Data.TO_INBOUND_ARRIVAL_DATE_TIME: row[9],
            Data.TO_OUTBOUND_DEPARTURE_AIRPORT: row[10],
            Data.TO_INBOUND_ARRIVAL_AIRPORT: row[11],
            Data.TO_OUTBOUND_ARRIVAL_DATE_TIME: row[12],
            Data.TO_MEALTYPE: row[13],
            Data.TO_OCEANVIEW: row[14],
            Data.TO_ROOMTYPE: row[15]
        }

    @property
    def meal_types(self) -> list[str]:
        # TODO: Verify that this is the correct list of meal types.
        return [
            'ALLINCLUSIVE',
            'ALLINCLUSIVEPLUS',
            'BREAKFAST',
            'FULLBOARD',
            'HALFBOARD',
            'HALFBOARDPLUS',
            'NONE',
        ]

    @property
    def meal_type_names(self) -> dict[str, str]:
        return {
            'ALLINCLUSIVE': 'All Inclusive',
            'ALLINCLUSIVEPLUS': 'All Inclusive Plus',
            'BREAKFAST': 'Breakfast',
            'FULLBOARD': 'Full Board',
            'HALFBOARD': 'Half Board',
            'HALFBOARDPLUS': 'Half Board Plus',
            'NONE': 'NONE',
        }

    def meal_type_translation(self, meal_type: str) -> str:
        switch: dict[str, str] = {
            'ALLINCLUSIVE': 'All Inclusive',
            'ALLINCLUSIVEPLUS': 'All Inclusive Plus',
            'BREAKFAST': 'Breakfast',
            'FULLBOARD': 'Full Board',
            'HALFBOARD': 'Half Board',
            'HALFBOARDPLUS': 'Half Board Plus',
            'NONE': 'NONE',
        }

        return switch.get(meal_type, 'Unknown Meal Type')

    @property
    def airport_codes_city(self) -> dict[str, str]:
        # TODO: Verify that this is the correct list of airports.
        return {
            'PMI': 'Palma de Mallorca',
            'FMO': 'Münster',
            'STR': 'Stuttgart',
            'LEJ': 'Leipzig',
            'NUE': 'Nürnberg',
            'CGN': 'Köln',
            'PAD': 'Paderborn',
            'HAJ': 'Hannover',
            'BER': 'Berlin',
            'FMM': 'Memmingen',
            'SCN': 'Saarbrücken',
            'DRS': 'Dresden',
            'BRE': 'Bremen',
            'DTM': 'Dortmund',
            'VIE': 'Wien',
            'NRN': 'Weeze',
            'BSL': 'Basel',
            'HHN': 'Frankfurt-Hahn',
            'FKB': 'Karlsruhe',
            'ZRH': 'Zürich',
            'SZG': 'Salzburg',
            'LUX': 'Luxemburg',
            'AMS': 'Amsterdam',
            'PRG': 'Prag',
            'FDH': 'Friedrichshafen',
            'INN': 'Innsbruck',
            'KSF': 'Kassel',
            'LNZ': 'Linz',
            'EIN': 'Eindhoven',
            'SXB': 'Straßburg',
            'HAM': 'Hamburg',
            'FRA': 'Frankfurt',
            'MUC': 'München',
            'DUS': 'Düsseldorf',
        }

    @property
    def airport_codes_country(self) -> dict[str, str]:
        # TODO: Verify that this is the correct list of airports.
        return {
            'FMO': 'Germany',
            'STR': 'Germany',
            'LEJ': 'Germany',
            'NUE': 'Germany',
            'CGN': 'Germany',
            'PAD': 'Germany',
            'HAJ': 'Germany',
            'BER': 'Germany',
            'FMM': 'Germany',
            'SCN': 'Germany',
            'DRS': 'Germany',
            'BRE': 'Germany',
            'DTM': 'Germany',
            'VIE': 'Austria',
            'NRN': 'Germany',
            'BSL': 'Switzerland',
            'HHN': 'Germany',
            'FKB': 'Germany',
            'ZRH': 'Switzerland',
            'SZG': 'Austria',
            'LUX': 'Luxembourg',
            'AMS': 'Netherlands',
            'PRG': 'Czech Republic',
            'FDH': 'Germany',
            'INN': 'Austria',
            'KSF': 'Germany',
            'LNZ': 'Austria',
            'EIN': 'Netherlands',
            'SXB': 'France',
            'HAM': 'Germany',
            'FRA': 'Germany',
            'MUC': 'Germany',
            'DUS': 'Germany',
        }

    @property
    def room_types(self) -> list[str]:
        return [
            'APARTMENT',
            'DOUBLE',
            'STUDIO',
            'SINGLE',
            'SUPERIOR',
            'ECONOMY',
            'FAMILY',
            'TRIPLE',
            'SUITE',
            'ACCORDINGDESCRIPTION',
            'BUNGALOW',
            'DELUXE',
            'MULTISHARE',
        ]

    @property
    def room_type_names(self) -> dict[str, str]:
        return {
            'APARTMENT': 'Apartment',
            'DOUBLE': 'Double',
            'STUDIO': 'Studio',
            'SINGLE': 'Single',
            'SUPERIOR': 'Superior',
            'ECONOMY': 'Economy',
            'FAMILY': 'Family',
            'TRIPLE': 'Triple',
            'SUITE': 'Suite',
            'ACCORDINGDESCRIPTION': 'According to description',
            'BUNGALOW': 'Bungalow',
            'DELUXE': 'Deluxe',
            'MULTISHARE': 'Multi Share',
        }


def main(*args, **kwargs) -> Data:
    """Backend initialization for c24hc."""
    root_file: Path = Path(kwargs['root_file'])
    data: Data = Data(root_file=root_file, dev_mode=True)

    return data
