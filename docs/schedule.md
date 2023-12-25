

## Get schedule list

### Request

```shell
curl \
  -X GET \
  -H "Content-Type: application/json" \
  http://localhost:3000/api/schedules
```

### Response

```json
{
  "message": "Schedule list",
  "data": [
    {
      "schedule_id":2,
      "doctor_id": 1,
      "doctor_name":"Доктор Айболит",
      "doctor_spec": "Хирург",
      "user_id": 2,
      "user_name":"Иван Иванов",
      "slot":"2023-12-26T09:30:00.000Z"
    }  
  ]
  
}
```

## Create appointment

```shell
curl \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"user_id":3, "doctor_id":3, "slot":"2023-12-25 16:15:00"}' \
  http://localhost:3000/api/schedules
```

### Response

```json
{
  "ok": true,
  "message": "An appointment was successfully created",
  "data": {
    "schedule_id": 1,
    "user_id":1,
    "doctor_id":2,
    "slot":"2023-12-25 15:36:00"
  }
}
```