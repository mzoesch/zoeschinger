from abc import ABC, abstractmethod


class SAlgo(ABC):

    arrayToSort: list[int]
    sortedSteps: list[list[int]]

    def __init__(self, arrayToSort: list[int]):
        self.arrayToSort = arrayToSort

    @abstractmethod
    def sort(self):
        pass
