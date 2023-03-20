from . import base
from . import steps
from models import norm
from typing import List


class SelectionSort(base.Base):

    def sort(self):
        self.sortedSteps = []
        self.internal_sort(self.arrayToSort.copy())

        return

    def internal_sort(self, arr: List[int]) -> List[int]:

        n = len(arr)
        for i in range(n - 1):

            min_idx = i
            for j in range(i + 1, n):

                self.sortedSteps.append(steps.Steps(
                    norm.COMPARISON, [min_idx, j], []))
                if arr[min_idx] > arr[j]:

                    min_idx = j

            arr[i], arr[min_idx] = arr[min_idx], arr[i]
            self.sortedSteps.append(steps.Steps(
                norm.SWAP, [i, min_idx], [arr[i], arr[min_idx]]))

        return arr
