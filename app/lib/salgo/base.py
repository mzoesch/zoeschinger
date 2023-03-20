from abc import ABC, abstractmethod
from . import steps
from typing import List

class Base(ABC):

    arrayToSort: List[int]
    sortedSteps: List[steps.Steps] = []

    def __init__(self, arrayToSort: List[int]):
        self.arrayToSort = arrayToSort

    @abstractmethod
    def sort(self):
        pass

    @abstractmethod
    def internal_sort(self, arr: List[int]) -> List[int]:
        pass
