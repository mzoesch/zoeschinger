# region step types

# example use cases:
# steps.Steps(norm.WRITE_TO_MAIN_ARRAY, [global_cursor], [value])
# steps.Steps(norm.WRITE_TO_AUXILIARY_ARRAY, [], [how many writes]))
# steps.Steps(norm.SWAP, [index1, index1], [value1, value2])
# steps.Steps(norm.COMPARISON, [index1, index2], [])

WRITE_TO_MAIN_ARRAY = 'write_main_arr'
# ACCESS_MAIN_ARRAY = 'access_main_arr'
WRITE_TO_AUXILIARY_ARRAY = 'write_aux_arr'
SWAP = 'swap'
COMPARISON = 'comparison'

# endregion
