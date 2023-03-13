export class SAlgInformation {
  #title;
  #explanation;
  #bestComplexity;
  #avgComplexity;
  #worstComplexity;
  #memory;
  #stable;
  #learnMore;

  constructor(
    title,
    explanation,
    bestComplexity,
    avgComplexity,
    worstComplexity,
    memory,
    stable,
    learnMore
  ) {
    this.#title = title;
    this.#explanation = explanation;

    this.#bestComplexity = bestComplexity;
    this.#avgComplexity = avgComplexity;
    this.#worstComplexity = worstComplexity;

    this.#memory = memory;
    this.#stable = stable;
    this.#learnMore = learnMore;
  }

  get title() {
    return this.#title;
  }

  get explanation() {
    return this.#explanation;
  }

  get bestComplexity() {
    return this.#bestComplexity;
  }

  get avgComplexity() {
    return this.#avgComplexity;
  }

  get worstComplexity() {
    return this.#worstComplexity;
  }

  get memory() {
    return this.#memory;
  }

  get stable() {
    return this.#stable;
  }

  get learnMore() {
    return this.#learnMore;
  }
}

export const salgs = [
  new SAlgInformation('-1', '-1', '-1', '-1', '-1', '-1'),

  new SAlgInformation(
    'Quicksort',
    'Quicksort is a divide and conquer algorithm. It works by selecting a ' +
      'pivot element from the array and partitioning the other elements into two sub-arrays, ' +
      'according to whether they are less than or greater than the pivot. The sub-arrays are ' +
      'then sorted recursively. This can be done in-place, requiring small additional amounts ' +
      'of memory to perform the sorting.',

    'O(n log n)',
    'O(n log n)',
    'O(n^2)',
    'log n',
    false,
    'https://en.wikipedia.org/wiki/Quicksort'
  ),
  new SAlgInformation(
    'Merge sort',
    'Merge sort is a divide and conquer algorithm. It works by ' +
      'recursively breaking down the array elements into nested sub-arrays, then recombining ' +
      'those nested sub-arrays in sorted order. It is an efficient, general-purpose, ' +
      'comparison-based sorting algorithm. Most implementations produce a stable sort, ' +
      'which means that the implementation preserves the input order of equal elements in the ' +
      'sorted output.',

    'O(n log n)',
    'O(n log n)',
    'O(n log n)',
    'n',
    true,
    'https://en.wikipedia.org/wiki/Mergesort'
  ),
  new SAlgInformation(
    'Selection sort',
    'Selection sort is a simple sorting algorithm. This ' +
      'sorting algorithm is an in-place comparison-based algorithm in which the list is ' +
      'divided into two parts, the sorted part at the left end and the unsorted part at the ' +
      'right end. Initially, the sorted part is empty and the unsorted part is the entire ' +
      'list. The smallest element is selected from the unsorted array and swapped with the ' +
      'leftmost element, and that element becomes a part of the sorted array. This process ' +
      'continues moving unsorted array boundary by one element to the right. This algorithm ' +
      'is not suitable for large data sets as its average and worst case complexities are ' +
      'of Ο(n^2), where n is the number of items.',

    'O(n^2)',
    'O(n^2)',
    'O(n^2)',
    '1',
    false,
    'https://en.wikipedia.org/wiki/Selection_sort'
  ),
  new SAlgInformation(
    'Bubble sort',
    'Bubble sort is a simple sorting algorithm. This ' +
      'sorting algorithm is comparison-based algorithm in which each pair of adjacent elements ' +
      'is compared and the elements are swapped if they are not in order. This algorithm is not ' +
      'suitable for large data sets as its average and worst case complexities are of Ο(n^2), ' +
      'where n is the number of items.',

    'O(n)',
    'O(n^2)',
    'O(n^2)',
    '1',
    true,
    'https://en.wikipedia.org/wiki/Bubble_sort'
  ),
];
