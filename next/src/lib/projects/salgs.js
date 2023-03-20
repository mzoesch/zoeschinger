export class SAlgInformation {
  #title;
  #explanation;
  #bestComplexity;
  #avgComplexity;
  #worstComplexity;
  #memory;
  #stable;
  #learnMore;
  #apiAcronym;

  constructor(
    title,
    explanation,
    bestComplexity,
    avgComplexity,
    worstComplexity,
    memory,
    stable,
    learnMore,
    apiAcronym
  ) {
    this.#title = title;
    this.#explanation = explanation;

    this.#bestComplexity = bestComplexity;
    this.#avgComplexity = avgComplexity;
    this.#worstComplexity = worstComplexity;

    this.#memory = memory;
    this.#stable = stable;
    this.#learnMore = learnMore;

    this.#apiAcronym = apiAcronym;
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

  get apiAcronym() {
    return this.#apiAcronym;
  }
}

export const salgs = [
  new SAlgInformation('-1', '-1', '-1', '-1', '-1', '-1'),

  new SAlgInformation(
    'Quicksort',
    [
      'Quicksort is a recursive divide and conquer comparison-based sorting algorithm.',
      'It works by selecting a pivot element from the array and partitioning the other elements into two sub-arrays, \
according to whether they are less than or greater than the pivot. The sub-arrays are then sorted recursively.',
      'Quicksort is noted for its efficiency in practice. It is one of the most commonly used sorting algorithms \
and is often used as a key component in other algorithms, like in the GNU C++ std library sort algorithm.',
    ],

    'O(n log n)',
    'O(n log n)',
    'O(n^2)',
    'O(log n)',
    false,
    'https://en.wikipedia.org/wiki/Quicksort',
    'quicksort'
  ),
  new SAlgInformation(
    'Merge sort',
    [
      'Merge sort is a recursive divide and conquer comparison-based sorting algorithm.',
      'It works by recursively breaking down the array elements into nested sub-arrays, \
then recombining those nested sub-arrays in sorted order.',
      'Merge sort is noted for its efficient use of memory and stability. \
It performs well on large data sets, and is often used as a subroutine in other sorting algorithms.',
    ],

    'O(n log n)',
    'O(n log n)',
    'O(n log n)',
    'O(n)',
    true,
    'https://en.wikipedia.org/wiki/Mergesort',
    'mergesort'
  ),
  new SAlgInformation(
    'Selection sort',
    [
      'Selection Sort is an iterative, in-place comparison-based sorting algorithm.',
      'It divides the data structure into two parts: the sorted part at the left end and the unsorted part at the right end. \
It repeatedly finds the minimum element from the unsorted part and puts it at the end of the sorted part.',
      'Selection sort is noted for its simplicity, and it has performance advantages over more complicated algorithms in certain situations, particularly where auxiliary memory is limited.',
    ],

    'O(n^2)',
    'O(n^2)',
    'O(n^2)',
    'O(1)',
    false,
    'https://en.wikipedia.org/wiki/Selection_sort',
    'selectionsort'
  ),
  new SAlgInformation(
    'Bubble sort',
    [
      'Bubble sort is an iterative, in-place comparison-based sorting algorithm',
      'It repeatedly steps through the data set, compares adjacent elements and swaps them \
if they are in the wrong order.',
      "Bubble sort is noted for its simplicity, but performs poorly in real world use. \
It's primary used as an educational tool for teaching the concept of a sorting algorithm.",
    ],

    'O(n)',
    'O(n^2)',
    'O(n^2)',
    'O(1)',
    true,
    'https://en.wikipedia.org/wiki/Bubble_sort',
    'bubblesort'
  ),
];
