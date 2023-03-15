# Following the norm of ~view.dio
# Class should only be used to communicate with the frontend

from pydantic import BaseModel
from enum import Enum


class SAlgoType(str, Enum):
    quicksort = "quicksort"
    mergesort = "mergesort"
    selectionsort = "selectionsort"
    bubblesort = "bubblesort"


class Model(BaseModel):
    type: SAlgoType
    arrayToSort: list[int]
    sortedSteps: list[list[int]] = []
