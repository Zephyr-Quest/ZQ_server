# ZephyrQuest - Server (PHP)

A PHP server with a REST API to get and upload maps.

## URLs

* Home page : `/index.html`
* Launcher (Game) : `/launcher.php`

## API routes

To get all of maps stored in the database :

```
[GET] http://<server_root>/api.php/maps
```

To get a map with its ID :

```
[GET] http://<server_root>/api.php/mapById?id=<map_id>
```

To upload a new map to the database :

```
[POST] http://<server_root>/api.php/newMap?name=<map_name>&author=<author>
```

with the folowing body :

```json
{
    "name": "<map_name>",
    "author": "<map_author>",
    "items": [
        {"id": 1, "x": 0, "y": 0, "usages": []},
        ...
    ]
}
```