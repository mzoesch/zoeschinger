from fastapi import FastAPI, HTTPException
from typing import List
import functools as ft
from uuid import uuid4, UUID
from fastapi.middleware.cors import CORSMiddleware
import os
from pathlib import Path
from fastapi.responses import FileResponse as Fileres
from fastapi.staticfiles import StaticFiles

from lib import c24hc_main, salgo_main

# from routes.projects.salgo import router as salgo_router
from models.projects import salgo as salgo_model
from lib.salgo import base, quicksort, mergesort, selectionsort, bubblesort

from models.projects import c24hc as c24hc_model

import time

c24hc_data: c24hc_main.Data = None

app = FastAPI()

# See source file for more information
# app.include_router(salgo_router)

# origins = [
#     'http://localhost:3000/'
# ]

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)


@app.get('/')
def root():
    return {'Hello': 'World'}


# region /projects/salgo


@app.get('/projects/salgo', tags=['salgo'])
def get_salgo():
    return {'SAlgo': 'Make a POST request to get started.'}


@app.post('/projects/salgo', tags=['salgo'])
def post_salgo(req: salgo_model.Model):

    algorithms = {
        'quicksort': quicksort.QuickSort(arrayToSort=req.arrayToSort),
        'mergesort': mergesort.MergeSort(arrayToSort=req.arrayToSort),
        'selectionsort': selectionsort.SelectionSort(arrayToSort=req.arrayToSort),
        'bubblesort': bubblesort.BubbleSort(arrayToSort=req.arrayToSort)
    }

    backend_algorithm: base.Base = algorithms[req.type]
    backend_algorithm.sort()

    return {
        'sortedSteps': backend_algorithm.sortedSteps
    }

# endregion /projects/salgo

# region /projects/c24hc


@app.get(
    '/projects/c24hc/trending',
    response_model=c24hc_model.TrendingOffersModel,
    tags=['c24hc']
)
@ft.lru_cache(maxsize=5)
def get_c24hc_trending() -> c24hc_model.TrendingOffersModel:
    """Trending just means the cheapest offers."""
    def transform_to_model(offer: tuple):
        hotel_information: dict = c24hc_data.get_hotel_information(
            hotelid=offer[1]
        )
        hotel: c24hc_model.Hotel = c24hc_model.Hotel(
            hotelid=hotel_information[c24hc_main.Data.TH_HOTEL_ID],
            hotelname=hotel_information[c24hc_main.Data.TH_HOTEL_NAME],
            hotelstars=hotel_information[c24hc_main.Data.TH_HOTEL_STAR_RATING]
        )

        offer_information: dict = c24hc_data.get_offer_information(
            offerid=offer[0]
        )
        offer: c24hc_model.Offer = c24hc_model.Offer(
            offerid=offer_information[c24hc_main.Data.TO_PK],
            hotel=hotel,
            countadults=offer_information[c24hc_main.Data.TO_COUNT_ADULTS],
            countchildren=offer_information[c24hc_main.Data.TO_COUNT_CHILDREN],
            price=offer_information[c24hc_main.Data.TO_PRICE],
            mealtype=offer_information[c24hc_main.Data.TO_MEALTYPE],
            oceanview=offer_information[c24hc_main.Data.TO_OCEANVIEW],
            roomtype=offer_information[c24hc_main.Data.TO_ROOMTYPE],
            outbounddeparturedatetime=offer_information[c24hc_main.Data.TO_OUTBOUND_DEPARTURE_DATE_TIME],
            outbounddepartureairport=offer_information[c24hc_main.Data.TO_OUTBOUND_DEPARTURE_AIRPORT],
            outboundarrivaldatetime=offer_information[c24hc_main.Data.TO_OUTBOUND_ARRIVAL_DATE_TIME],
            outboundarrivalairport=offer_information[c24hc_main.Data.TO_OUTBOUND_ARRIVAL_AIRPORT],
            inbounddeparturedatetime=offer_information[c24hc_main.Data.TO_INBOUND_DEPARTURE_DATE_TIME],
            inbounddepartureairport=offer_information[c24hc_main.Data.TO_INBOUND_DEPARTURE_AIRPORT],
            inboundarrivaldatetime=offer_information[c24hc_main.Data.TO_INBOUND_ARRIVAL_DATE_TIME],
            inboundarrivalairport=offer_information[c24hc_main.Data.TO_INBOUND_ARRIVAL_AIRPORT]
        )

        return offer

    cheapest_offers: list[tuple] = c24hc_data.get_cheapest_offers(limit=10)
    res: c24hc_model.TrendingOffersModel = c24hc_model.TrendingOffersModel(offers=[
        transform_to_model(offer) for offer in cheapest_offers
    ])

    return res


@app.get(
    '/projects/c24hc/offer/{offer_id}',
    response_model=c24hc_model.Offer,
    tags=['c24hc']
)
@ft.lru_cache(maxsize=50)
def get_c24hc_offer(offer_id: int) -> c24hc_model.Offer:
    if offer_id < 0:
        raise HTTPException(status_code=404, detail='Offer not found.')

    offer_information: dict | None = c24hc_data.get_offer_information(
        offerid=offer_id
    )

    if offer_information is None:
        raise HTTPException(status_code=404, detail='Offer not found.')

    hotel_information: dict = c24hc_data.get_hotel_information(
        hotelid=offer_information[c24hc_main.Data.TO_HOTEL_ID]
    )

    hotel: c24hc_model.Hotel = c24hc_model.Hotel(
        hotelid=hotel_information[c24hc_main.Data.TH_HOTEL_ID],
        hotelname=hotel_information[c24hc_main.Data.TH_HOTEL_NAME],
        hotelstars=hotel_information[c24hc_main.Data.TH_HOTEL_STAR_RATING]
    )

    offer: c24hc_model.Offer = c24hc_model.Offer(
        offerid=offer_information[c24hc_main.Data.TO_PK],
        hotel=hotel,
        countadults=offer_information[c24hc_main.Data.TO_COUNT_ADULTS],
        countchildren=offer_information[c24hc_main.Data.TO_COUNT_CHILDREN],
        price=offer_information[c24hc_main.Data.TO_PRICE],
        mealtype=offer_information[c24hc_main.Data.TO_MEALTYPE],
        oceanview=offer_information[c24hc_main.Data.TO_OCEANVIEW],
        roomtype=offer_information[c24hc_main.Data.TO_ROOMTYPE],
        outbounddeparturedatetime=offer_information[c24hc_main.Data.TO_OUTBOUND_DEPARTURE_DATE_TIME],
        outbounddepartureairport=offer_information[c24hc_main.Data.TO_OUTBOUND_DEPARTURE_AIRPORT],
        outboundarrivaldatetime=offer_information[c24hc_main.Data.TO_OUTBOUND_ARRIVAL_DATE_TIME],
        outboundarrivalairport=offer_information[c24hc_main.Data.TO_OUTBOUND_ARRIVAL_AIRPORT],
        inbounddeparturedatetime=offer_information[c24hc_main.Data.TO_INBOUND_DEPARTURE_DATE_TIME],
        inbounddepartureairport=offer_information[c24hc_main.Data.TO_INBOUND_DEPARTURE_AIRPORT],
        inboundarrivaldatetime=offer_information[c24hc_main.Data.TO_INBOUND_ARRIVAL_DATE_TIME],
        inboundarrivalairport=offer_information[c24hc_main.Data.TO_INBOUND_ARRIVAL_AIRPORT]
    )

    return offer


@app.get(
    '/projects/c24hc/img_details',
    response_model=c24hc_model.ImageDetails,
    tags=['c24hc']
)
@ft.lru_cache(maxsize=1)
def get_c24hc_img_details() -> c24hc_model.ImageDetails:
    number_of_images: int = len(
        os.listdir(
            c24hc_data.path_to_sample_hotel_img_dir
        )
    )

    return c24hc_model.ImageDetails(
        until=number_of_images
    )


@app.get(
    '/projects/c24hc/img/{img_id}',
    tags=['c24hc']
)
def get_c24hc_img(img_id: str):
    if img_id == '0':
        img_id = '1'

    if img_id == '-1':
        img_id = '2'

    path: Path = c24hc_data.path_to_sample_hotel_img_dir.joinpath(
        f'{img_id}.jpg')

    if not path.exists():
        raise HTTPException(status_code=404, detail='File not found.')

    return Fileres(path=path)


@app.get(
    '/projects/c24hc/random_img',
    tags=['c24hc']
)
def get_c24hc_random_img():
    """WARNING: Does not work, because of browser caching."""
    number_of_images: int = len(
        os.listdir(
            c24hc_data.path_to_sample_hotel_img_dir
        )
    )

    random_pick: int = uuid4().int % number_of_images + 1
    path: Path = c24hc_data.path_to_sample_hotel_img_dir.joinpath(
        f'{random_pick}.jpg'
    )

    if not path.exists():
        raise HTTPException(status_code=404, detail='File not found.')

    return Fileres(path=path)


@app.get(
    '/projects/c24hc/meal_types',
    response_model=List[str],
    tags=['c24hc']
)
def get_meal_types():
    return c24hc_data.meal_types


@app.get(
    '/projects/c24hc/meal_type_names',
    response_model=c24hc_model.MealTypeName,
    tags=['c24hc']
)
def get_meal_type_names():
    return c24hc_model.MealTypeName(
        mealtypes=c24hc_data.meal_type_names
    )


@app.get(
    '/projects/c24hc/translate_meal_type/{meal_type}',
    response_model=str,
    tags=['c24hc']
)
def translate_meal_type(meal_type: str):
    return c24hc_data.meal_type_translation(meal_type)


@app.get(
    '/projects/c24hc/airport_codes_city',
    response_model=c24hc_model.AirportCodeCity,
    tags=['c24hc']
)
def get_airport_codes():
    return c24hc_model.AirportCodeCity(
        cities=c24hc_data.get_airport_codes_city()
    )


@app.get(
    '/projects/c24hc/room_type_names',
    response_model=c24hc_model.RoomTypeName,
    tags=['c24hc']
)
def get_room_type_names():
    return c24hc_model.RoomTypeName(
        roomtypes=c24hc_data.room_type_names
    )

@app.post(
    '/projects/c24hc/matching_offers',
    response_model=c24hc_model.TrendingOffersModel,
    tags=['c24hc']
)
def get_matching_offers(req: c24hc_model.SearchForOffersModel):
    def transform_to_model(offer: dict):
        hotel_information: dict = c24hc_data.get_hotel_information(
            hotelid=offer[1]
        )
        hotel: c24hc_model.Hotel = c24hc_model.Hotel(
            hotelid=hotel_information[c24hc_main.Data.TH_HOTEL_ID],
            hotelname=hotel_information[c24hc_main.Data.TH_HOTEL_NAME],
            hotelstars=hotel_information[c24hc_main.Data.TH_HOTEL_STAR_RATING]
        )

        offer_information: dict = c24hc_data.get_offer_information(
            offerid=offer[0]
        )
        offer: c24hc_model.Offer = c24hc_model.Offer(
            offerid=offer_information[c24hc_main.Data.TO_PK],
            hotel=hotel,
            countadults=offer_information[c24hc_main.Data.TO_COUNT_ADULTS],
            countchildren=offer_information[c24hc_main.Data.TO_COUNT_CHILDREN],
            price=offer_information[c24hc_main.Data.TO_PRICE],
            mealtype=offer_information[c24hc_main.Data.TO_MEALTYPE],
            oceanview=offer_information[c24hc_main.Data.TO_OCEANVIEW],
            roomtype=offer_information[c24hc_main.Data.TO_ROOMTYPE],
            outbounddeparturedatetime=offer_information[c24hc_main.Data.TO_OUTBOUND_DEPARTURE_DATE_TIME],
            outbounddepartureairport=offer_information[c24hc_main.Data.TO_OUTBOUND_DEPARTURE_AIRPORT],
            outboundarrivaldatetime=offer_information[c24hc_main.Data.TO_OUTBOUND_ARRIVAL_DATE_TIME],
            outboundarrivalairport=offer_information[c24hc_main.Data.TO_OUTBOUND_ARRIVAL_AIRPORT],
            inbounddeparturedatetime=offer_information[c24hc_main.Data.TO_INBOUND_DEPARTURE_DATE_TIME],
            inbounddepartureairport=offer_information[c24hc_main.Data.TO_INBOUND_DEPARTURE_AIRPORT],
            inboundarrivaldatetime=offer_information[c24hc_main.Data.TO_INBOUND_ARRIVAL_DATE_TIME],
            inboundarrivalairport=offer_information[c24hc_main.Data.TO_INBOUND_ARRIVAL_AIRPORT]
        )

        return offer

    matching_offers: list[dict] = c24hc_data.get_matching_offers(
        20,
        duration=req.duration,
        earliest_departure_date=req.earliestdeparturedate,
        latest_departure_date=req.latestreturndate,
        count_adults=req.countadults,
        count_children=req.countchildren,
        departure_airports=[airport_code for airport_code in req.departureairports]
    )
    res: c24hc_model.SearchOffersModel = c24hc_model.SearchOffersModel(offers=[
        transform_to_model(offer) for offer in matching_offers
    ])

    return res

# endregion /projects/c24hc


# region /static files

app.mount(
    '/static',
    StaticFiles(directory='static'),
    name='static'
)

# endregion /static files


def main():
    global c24hc_data

    _ = salgo_main.main()
    c24hc_data = c24hc_main.main(root_file=__file__)


# Because we run the app with uvicorn's main:app
# if __name__ == '__main__':
#     main()
main()
