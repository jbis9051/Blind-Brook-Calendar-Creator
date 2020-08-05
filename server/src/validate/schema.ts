export default {
    "type": "array",
    "minItems": 1,
    "items": [{
        "type": "object",
        "required": ["name", "letterDays", "period"],
        "properties": {
            "name": {
                "type": "string",
                "pattern": "[ \t]+|[ \t]+$",
                "minLength": 1
            },
            "letterDays": {
                "type": "array", 
                "items": { 
                    "type": "string",
                    "pattern": "([A-H],?)*[A-H]$" 
                },
            },
            "room": {
                "type": "string"
            },
            "period": {
                "type": "number", 
                "minimum": 1,
                "maximum": 8, 
            },
            "teacher": { "type": "string" }
        }
    }]
};