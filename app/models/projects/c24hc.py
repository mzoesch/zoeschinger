# Class should only be used to communicate with the frontend

from pydantic import BaseModel
from typing import List


class Hotel(BaseModel):
    hotelid: int
    hotelname: str
    hotelstars: int


class Offer(BaseModel):
    offerid: int

    hotel: Hotel

    countadults: int
    countchildren: int

    price: int

    mealtype: str
    oceanview: bool
    roomtype: str

    outbounddeparturedatetime: str
    outbounddepartureairport: str
    outboundarrivaldatetime: str
    outboundarrivalairport: str

    inbounddeparturedatetime: str
    inbounddepartureairport: str
    inboundarrivaldatetime: str
    inboundarrivalairport: str


class TrendingOffersModel(BaseModel):
    offers: list[Offer] | None = None


class ImageDetails(BaseModel):
    until: int


class AirportCodeCity(BaseModel):
    cities: dict[str, str] | None = None


class MealTypeName(BaseModel):
    mealtypes: dict[str, str] | None = None


class RoomTypeName(BaseModel):
    roomtypes: dict[str, str] | None = None
