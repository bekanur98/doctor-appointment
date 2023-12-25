

## Get doctor list

### Request

```shell
curl \
  -X GET \
  -H "Content-Type: application/json" \
  http://localhost:3000/api/doctors
```

### Response

```json
{
  "message": "Doctor list",
  "data": [
    {
      "doctor_id": 1,
      "doctor_name":"Доктор Айболит",
      "doctor_spec": "Хирург"
    }  
  ]
  
}
```

## Create doctor

```shell
curl \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"name": "Мистер очевидность", "spec":"Раздражитель"}' \
  http://localhost:3000/api/doctors
```

### Response

```json
{
  "ok": true,
  "message": "Successfully created",
  "data": {
    "doctor_id":2,
    "doctor_name": "Мистер очевидность",
    "spec":"Раздражитель"
  }
}
```