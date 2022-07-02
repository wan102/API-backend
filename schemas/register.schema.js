module.exports = {
    "$schema": "http://json-schema.org/draft-04/schema#",
    "type": "object",
    "properties": {
      "user_name": {
        "description": "User name of user",
        "type": "string"
      },
      "password": {
        "description": "login password",
        "type": "string"
      },
      "email": {
        "description": "email of user",
        "type": "string"
      },
    },
    "required": ["user_name", "password", "email"]
  }
  