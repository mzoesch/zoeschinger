from . import base as b
from . import steps


class MergeSort(b.Base):

    def sort(self):
        self.sortedSteps = self.arrayToSort.copy()
        self.internal_sort(self.sortedSteps)

        return

    @staticmethod
    def internal_sort(arr: list[int]) -> list[int]:

        if len(arr) <= 1:
            return arr

        mid = len(arr) // 2
        L = arr[:mid]
        R = arr[mid:]

        MergeSort.internal_sort(L)
        MergeSort.internal_sort(R)

        i = j = k = 0

        while i < len(L) and j < len(R):
            if L[i] < R[j]:
                arr[k] = L[i]
                i += 1
            else:
                arr[k] = R[j]
                j += 1
            k += 1

        while i < len(L):
            arr[k] = L[i]
            i += 1
            k += 1

        while j < len(R):
            arr[k] = R[j]
            j += 1
            k += 1

        return arr