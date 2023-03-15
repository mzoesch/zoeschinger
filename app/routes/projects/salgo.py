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
async def post_salgo(req: salgo_model.Model):

    algorithms = {
        'quicksort': quicksort.QuickSort(arrayToSort=req.arrayToSort),
        'mergesort': mergesort.MergeSort(arrayToSort=req.arrayToSort),
    }

    backend_algorithm: base.Base = algorithms[req.type]
    backend_algorithm.sort()

    req.sortedSteps = backend_algorithm.sortedSteps

    return req