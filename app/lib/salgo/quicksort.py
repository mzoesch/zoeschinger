from . import base
from . import steps
from models import norm


class QuickSort(base.Base):

    def sort(self):
        self.sortedSteps = []
        self.internal_sort(self.arrayToSort.copy(), 0,
                           len(self.arrayToSort) - 1)

        return

    # Auxiliary function
    def partition(self, arr: list[int], low, high):
        pivot = arr[high]
        i = low - 1

        for j in range(low, high):

            self.sortedSteps.append(steps.Steps(
                norm.COMPARISON, [j, pivot], []))
            if arr[j] < pivot:

                i += 1

                arr[i], arr[j] = arr[j], arr[i]
                self.sortedSteps.append(steps.Steps(
                    norm.SWAP, [i, j], [arr[i], arr[j]]))

        i += 1

        arr[i], arr[high] = arr[high], arr[i]
        self.sortedSteps.append(steps.Steps(
            norm.SWAP, [i, high], [arr[i], arr[high]]))

        return i

    def internal_sort(self, arr: list[int], low, high) -> list[int]:
        if low >= high or low < 0 or high < 0:
            return

        p = self.partition(arr, low, high)
        self.internal_sort(arr, low, p - 1)
        self.internal_sort(arr, p + 1, high)

        return arr
