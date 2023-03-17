# region step types

# example use cases:
# steps.Steps(norm.WRITE_TO_MAIN_ARRAY, [global_cursor], [value])
# steps.Steps(norm.WRITE_TO_AUXILIARY_ARRAY, [], [how many writes]))
# steps.Steps(norm.COMPARISON, [], []) !!tbd!!

WRITE_TO_MAIN_ARRAY = 'write_main_arr'
# ACCESS_MAIN_ARRAY = 'access_main_arr'
WRITE_TO_AUXILIARY_ARRAY = 'write_aux_arr'
COMPARISON = 'comparison'

# endregion
