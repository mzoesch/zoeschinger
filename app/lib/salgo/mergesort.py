from . import base
from . import steps
from models import norm


class MergeSort(base.Base):

    def sort(self):
        self.sortedSteps = []
        self.internal_sort(self.arrayToSort.copy(), 0)

        return

    def internal_sort(self, arr: list[int], global_cursor: int) -> list[int]:

        if len(arr) <= 1:
            return arr

        mid = len(arr) // 2

        L = arr[:mid]
        R = arr[mid:]
        self.sortedSteps.append(steps.Steps(
            norm.WRITE_TO_AUXILIARY_ARRAY, [], [len(arr)]))

        MergeSort.internal_sort(self, L, global_cursor)
        MergeSort.internal_sort(self, R, global_cursor + mid)

        i = j = k = 0

        while i < len(L) and j < len(R):

            self.sortedSteps.append(steps.Steps(
                norm.COMPARISON, [
                    global_cursor + i, global_cursor + j + mid], []))
            if L[i] < R[j]:

                arr[k] = L[i]
                self.sortedSteps.append(steps.Steps(
                    norm.WRITE_TO_MAIN_ARRAY, [global_cursor], [L[i]]))

                i += 1
            else:

                arr[k] = R[j]
                self.sortedSteps.append(steps.Steps(
                    norm.WRITE_TO_MAIN_ARRAY, [global_cursor], [R[j]]))

                j += 1

            k += 1
            global_cursor += 1
            continue

        while i < len(L):

            arr[k] = L[i]
            self.sortedSteps.append(steps.Steps(
                norm.WRITE_TO_MAIN_ARRAY, [global_cursor], [L[i]]))

            i += 1
            k += 1
            global_cursor += 1
            continue

        while j < len(R):

            arr[k] = R[j]
            self.sortedSteps.append(steps.Steps(
                norm.WRITE_TO_MAIN_ARRAY, [global_cursor], [R[j]]))

            j += 1
            k += 1
            global_cursor += 1
            continue

        return arr
