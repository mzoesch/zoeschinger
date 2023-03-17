import json


class Steps:
    """
    write_main_arr
    """

    step_type: str
    indices: list[int]
    values: list[int]

    def __init__(self,
                 step_type: str,
                 indices: list[int],
                 values: list[int]
                 ):
        self.step_type = step_type
        self.indices = indices
        self.values = values

        return

    def toJSON():
        pass

    def __repr__(self) -> str:
        dictionary: dict = {
            "stepType": self.step_type,
            "indices": self.indices,
            "values": self.values
        }

        return json.dumps(
            dictionary,
            default=lambda o: o.__dict__,
            sort_keys=True,
            indent=2
        )
