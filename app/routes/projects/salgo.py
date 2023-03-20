# WARNING
# Idk why, but when accessing this api route over https,
# it will redirect to http. WHY????
# So DO NOT use, unless you know how to fix this or
# you want so see the world burn
#
# Temporary fix: see main.py

from fastapi import APIRouter
from pydantic import BaseModel
import json
from models.projects import salgo as salgo_model
from lib.salgo import base, quicksort, mergesort, selectionsort, bubblesort
# from fastapi.middleware.cors import CORSMiddleware

router = APIRouter(
    prefix="/projects/salgo",
    tags=["SAlgo"],
)

# router.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

@router.get("/")
def get_salgo():
    return {"SAglo": "Make a POST request to get started."}


@router.post("/")
def post_salgo(req: salgo_model.Model):

    algorithms = {
        'quicksort': quicksort.QuickSort(arrayToSort=req.arrayToSort),
        'mergesort': mergesort.MergeSort(arrayToSort=req.arrayToSort),
        'selectionsort': selectionsort.SelectionSort(arrayToSort=req.arrayToSort),
        'bubblesort': bubblesort.BubbleSort(arrayToSort=req.arrayToSort)
    }

    backend_algorithm: base.Base = algorithms[req.type]
    backend_algorithm.sort()

    # print(f'{backend_algorithm.sortedSteps=}')
    return {
        "sortedSteps": backend_algorithm.sortedSteps
    }
