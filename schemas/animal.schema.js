module.exports = {
    "$schema": "http://json-schema.org/draft-04/schema#",
    "id": "/animal",
    "title": "Animal",
    "description": "An animal",
    "type": "object",
    "properties": {
      "name": {
        "description": "Name of animal",
        "type": "string"
      },
      "birthday": {
        "description": "Birthday of animal",
        "type": "timestamp"
      },
      "gender": {
        "description": "Gender of animal",
        "type": "string"
      },
      "isneutered": {
        "description": "Animal is neutered or not",
        "type": "boolean"
      },
      "note": {
        "description": "Detail of animal",
        "type": "string"
      },
      "status": {
        "description": "Status of animal",
        "type": "string"
      },
      "breed_id": {
        "description": "Breed ID of the animal",
        "type": "integer"
      },
      "centre_id": {
        "description": "centre ID of the animal",
        "type": "integer"
      },
    },
    "required": ["name", "breed_id", "centre_id"]
  }
  