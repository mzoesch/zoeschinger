from fastapi import APIRouter
from pydantic import BaseModel
import json
from models.projects import salgo as salgo_model
from lib.salgo import base, quicksort, mergesort

router = APIRouter(
    prefix="/projects/salgo",
    tags=["SAlgo"],
)


@router.get("/")
async def get_salgo():
    return {"Salgo": "Salgo"}


@router.post("/")
async def post_salgo(salgo: salgo_model.SAlgo):

    algorithms = {
        'quicksort': quicksort.QuickSort(arrayToSort=salgo.arrayToSort),
        'mergesort': mergesort.MergeSort(arrayToSort=salgo.arrayToSort),
    }

    backend_algorithm: base.SAlgo = algorithms[salgo.type]
    backend_algorithm.sort()

    salgo.sortedSteps = backend_algorithm.sortedSteps

    return salgo
