from . import base as b


class QuickSort(b.Base):

    def sort(self):
        self.sortedSteps = self.arrayToSort.copy()
        self.sortedSteps.sort()
        self.sortedSteps = [self.sortedSteps]

        return

    def internal_sort(self, arr: list[int]) -> list[int]:
        pass
