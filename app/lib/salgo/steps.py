import json
from typing import List


class Steps:

    step_type: str
    indices: List[int]
    values: List[int]

    def __init__(self,
                 step_type: str,
                 indices: List[int],
                 values: List[int]
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
