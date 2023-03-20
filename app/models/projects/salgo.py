# Following the norm of ~view.dio
# Class should only be used to communicate with the frontend

from pydantic import BaseModel
from enum import Enum
from lib.salgo import steps


class SAlgoType(str, Enum):
    quicksort = "quicksort"
    mergesort = "mergesort"
    selectionsort = "selectionsort"
    bubblesort = "bubblesort"


class Model(BaseModel):

    class Config:
        arbitrary_types_allowed = True

    type: SAlgoType
    arrayToSort: list[int]

    # sortedSteps: list[steps.Steps] = []
    sortedSteps: list[dict] = []
