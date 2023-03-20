from fastapi import FastAPI, HTTPException
from typing import List
from uuid import uuid4, UUID
from fastapi.middleware.cors import CORSMiddleware

# from routes.projects.salgo import router as salgo_router
from models.projects import salgo as salgo_model
from lib.salgo import base, quicksort, mergesort, selectionsort, bubblesort

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

@app.get('/projects/salgo')
def get_salgo():
    return {'SAlgo': 'Make a POST request to get started.'}


@app.post('/projects/salgo')
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


# endregion
