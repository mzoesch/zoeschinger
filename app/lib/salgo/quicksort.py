from . import base as b


class QuickSort(b.Base):

    def sort(self):
        self.sortedSteps = self.arrayToSort.copy()
        self.sortedSteps.sort()
        self.sortedSteps = [self.sortedSteps]

        return
