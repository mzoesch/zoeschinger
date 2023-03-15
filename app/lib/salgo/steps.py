class Steps:

    step_type: str
    indices: list[int]
    values: list[int]

    def __init__(self, step_type: str, indices: list[int], values: list[int]):
        self.step_type = step_type
        self.indices = indices
        self.values = values

        return

    def toJSON():
        pass
