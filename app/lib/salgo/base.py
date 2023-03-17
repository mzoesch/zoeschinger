from abc import ABC, abstractmethod
from . import steps


class Base(ABC):

    arrayToSort: list[int]
    sortedSteps: list[steps.Steps] = []

    def __init__(self, arrayToSort: list[int]):
        self.arrayToSort = arrayToSort

    @abstractmethod
    def sort(self):
        pass

    @abstractmethod
    def internal_sort(self, arr: list[int]) -> list[int]:
        pass
