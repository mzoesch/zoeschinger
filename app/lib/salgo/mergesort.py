from . import base as b
from . import steps


class MergeSort(b.Base):

    def sort(self):
        self.sortedSteps = []

        print(f'{self.internal_sort(self.arrayToSort.copy())=}')

        return

    def internal_sort(self, arr: list[int]) -> list[int]:

        if len(arr) <= 1:
            return arr

        mid = len(arr) // 2
        L = arr[:mid]
        R = arr[mid:]

        MergeSort.internal_sort(self, L)
        MergeSort.internal_sort(self, R)

        i = j = k = 0

        while i < len(L) and j < len(R):
            if L[i] < R[j]:

                arr[k] = L[i]  # Write to main array
                self.sortedSteps.append(steps.Steps(
                    "write_main_arr", [k], [L[i]])
                )

                i += 1
            else:

                arr[k] = R[j]  # Write to main array
                self.sortedSteps.append(steps.Steps(
                    "write_main_arr", [k], [R[j]])
                )

                j += 1
            k += 1

        while i < len(L):
            arr[k] = L[i]
            self.sortedSteps.append(steps.Steps(
                "write_main_arr", [k], [L[i]])
            )

            i += 1
            k += 1

        while j < len(R):
            arr[k] = R[j]
            self.sortedSteps.append(steps.Steps(
                "write_main_arr", [k], [R[j]])
            )

            j += 1
            k += 1

        return arr
