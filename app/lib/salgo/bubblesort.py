from . import base
from . import steps
from models import norm


class BubbleSort(base.Base):

    def sort(self):
        self.sortedSteps = []
        self.internal_sort(self.arrayToSort.copy())

        return

    def internal_sort(self, arr: list[int]) -> list[int]:

        n = len(arr)
        for i in range(n - 1):
            for j in range(0, n - 1 - i):

                self.sortedSteps.append(steps.Steps(
                    norm.COMPARISON, [j, j + 1], []))
                if arr[j] > arr[j + 1]:

                    arr[j], arr[j + 1] = arr[j + 1], arr[j]
                    self.sortedSteps.append(steps.Steps(
                        norm.SWAP, [j, j + 1], [arr[j], arr[j + 1]]))

        return arr
