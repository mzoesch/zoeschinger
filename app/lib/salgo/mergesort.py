from . import base as b


class MergeSort(b.SAlgo):

    def sort(self):
        self.sortedSteps = self.arrayToSort.copy()
        self.sortedSteps.sort()
        self.sortedSteps = [self.sortedSteps]

        return
