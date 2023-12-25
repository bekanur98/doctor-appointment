

## Get user list

### Request

```shell
curl \
  -X GET \
  -H "Content-Type: application/json" \
  http://localhost:3000/api/users
```

### Response

```json
{
  "message": "user list",
  "data": [
    {
      "user_id": 1,
      "user_name":"Доктор Айболит",
      "user_spec": "Хирург"
    }  
  ]
  
}
```

## Create user

```shell
curl \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"name": "Уася", "phone":"+7 900 456 78 90"}' \
  http://localhost:3000/api/users
```

### Response

```json
{
  "ok": true,
  "message": "Successfully created",
  "data": {
    "user_id":2,
    "user_name": "Уася",
    "user_phone":"+7 900 456 78 90"
  }
}
```