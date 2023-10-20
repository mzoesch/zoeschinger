from pathlib import Path


class CSVSplitter:
    RELATIVE_PATH_TO_CSV: Path = Path(
        Path(__file__).parent.parent.parent.parent /
        'data' / 'c24hc' / 'offers.csv'
    )
    RELATIVE_PATH_TO_SPLIT_FILES: Path = Path(
        __file__
    ).parent.parent.parent.parent / 'data' / 'c24hc'
    SPLIT_FILE_NAME: str = 'split_offers_'

    def __init__(self) -> None:
        print('Reading csv file . . . ')

        self.csv_file: list[str] | None = open(
            self.RELATIVE_PATH_TO_CSV, 'r'
        ).readlines()

        if not self.csv_file:
            raise FileNotFoundError('CSV file not found.')

        return

    def split(self) -> None:
        print('Splitting csv file . . .')

        pending_lines: int = len(self.csv_file)
        file_id = 0
        size = 10_000

        while ...:
            file: Path = Path(CSVSplitter.RELATIVE_PATH_TO_SPLIT_FILES) / (
                CSVSplitter.SPLIT_FILE_NAME + str(file_id) + '.csv'
            )

            print(f'Writing to {file} . . .', end=' ')
            if pending_lines - size <= 0:
                open(file, 'w').writelines(self.csv_file[file_id * size:])
            else:
                open(file, 'w').writelines(
                    self.csv_file[file_id * size:(file_id + 1) * size]
                )
            print('Ok.')

            if file_id > 10:
                print('Aborting.')
                return

            file_id += 1
            if pending_lines - size <= 0:
                break
            pending_lines -= size
            continue

        print('Finished splitting file - Done.')
        return


def main(*args, **kwargs):
    """
    Utility file for development purposes.\n
    Should not be used in production.
    """

    csv_splitter = CSVSplitter()
    csv_splitter.split()

    return


if __name__ == '__main__':
    main()
