module.exports = {
    "$schema": "http://json-schema.org/draft-04/schema#",
    "id": "/bookmark",
    "title": "Bookmark",
    "description": "An bookmark",
    "type": "object",
    "properties": {
      "user_id": {
        "description": "ID of user",
        "type": "intger"
      },
      "animal_id": {
        "description": "ID of the animal",
        "type": "integer"
      },
    },
    "required": ["user_id", "animal_id"]
  }
  