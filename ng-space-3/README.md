# NgSpace

Champion, your company is looking for a hero to work on its bleeding edge frontend application. This is no easy task, which is why we setup this quest for you to prepare yourself for the journey. Follow the todo list and keep an eye on the helpful links if you want to succeed.

## Todos

1. Add routing feature to the `ng-space` application
2. Create a route `/rockets` to display the `RocketsListComponent`. Don't forget to make it the default one !
3. Create a new component called `RocketComponent` using the snippets below
4. Create a route to display `RocketComponent` everytime we navigate to `/rockets/{id}`
5. Using the snippet below, add a Go to link in the `RocketDetailsComponent` to navigate to `/rockets/{id}`
6. Fetch rocket informations using the `https://api.spacexdata.com/v3/rockets/{rocket_id}` endpoint and display it in the `RocketComponent` view
7. Fetch all of the rocket launches using the `https://api.spacexdata.com/v3/launches?rocket_id={rocket_id}` and display them in the `RocketComponent` view using the snippets below
8. Our secret agent in SpaceX managed to get his hands on the list of `rocket_id`, it's equal to `['falcon1', 'falcon9', 'falconheavy', 'starship']`. Use this to our advantage to quickly navigate from one rocket to another using a next/previous buttons (snippets below)
9. Our users are smart, they discovered that changing the browser url will also change the displayed rocket. However, sometimes they make mistakes while writing the `rocket_id`. Try to protect access to the `/rockets/{id}` route if the id is not in `['falcon1', 'falcon9', 'falconheavy', 'starship']` list. Redirect to a `notfound` route using the `NotFound` component for a pleasant user experience.
10. Bonus: How about you ditch this hard coded `rocket_id` list `['falcon1', 'falcon9', 'falconheavy', 'starship']` and go for a full async check before allowing access to the `/rockets/{id}` route.


## Further help

- https://angular.io/guide/router#configuration
- https://angular.io/guide/router#router-outlet
- https://angular.io/api/router/ActivatedRouteSnapshot
- https://angular.io/api/common/JsonPipe
- https://documenter.getpostman.com/view/2025350/RWaEzAiG?version=latest
- http://www.json2ts.com/
- https://www.learnrxjs.io/
- https://angular.io/api/common/http/HttpParams
- https://angular.io/guide/router#navigate-to-crisis-list-with-a-relative-url
- https://angular.io/guide/router#canactivate-requiring-authentication

## Expected results:

![Final results](ng-space-3.gif "At the end, your app should look like this")

## Resources:

```html
<!-- RocketComponent HTML -->
  <div class="header">
    <h1>{{ rocket.rocket_name }}</h1>
    <i class="fa fa-circle" [ngClass]="rocket.active ? 'active' : 'inactive'"></i>
  </div>

  <div class="body">
    <div class="summary">
      <h3>Summary:</h3>
      <div class="rows">
        <div class="label-value-container">First flight: {{ rocket.first_flight }}</div>
        <div class="label-value-container">Company: {{ rocket.company }}</div>
        <div class="label-value-container">Cost per launch: {{ rocket.cost_per_launch }}</div>
        <div class="label-value-container">Success rate: {{ rocket.success_rate_pct }}</div>
        <div class="label-value-container">
          <!-- TODO 6: Provide your user with a great experience and open this link into a separate tab -->
          Wikipedia: <a> {{ rocket.wikipedia }} </a>
        </div>
      </div>
    </div>
  </div>
```

```css
/* RocketComponent scss*/
:host {
  display: flex;
  flex-flow: column;
  width: 100%;
  .header {
    display: flex;
    i {
      align-self: center;
      padding: 10px;
    }
    .active {
      color: green;
    }

    .inactive {
      color: red;
    }
  }
  .body {
    .summary {
      .rows {
        padding: 10px;
        .label-value-container {
          flex: 1 1 50%;
        }
      }
    }
  }
}
```

```html
<!--Be creative with styles ;)-->
<a>Go to <i class="fa fa-rocket" aria-hidden="true"></i></a>
```

```html
<!-- TODO 7: To display the list of launches -->
    <div class="content">
      <div class="items-header">
        <div class="hcell">Name</div>
        <div class="hcell">Launch date</div>
        <div class="hcell">Success</div>
        <div class="hcell">Details</div>
      </div>
      <div class="item-row">
        <div class="rcell">{{ launch.mission_name }}</div>
        <div class="rcell">{{ launch.launch_year }}</div>
        <div class="rcell"><i class="fa fa-circle" [ngClass]="launch.launch_success ? 'active' : 'inactive'"></i></div>
        <div class="rcell">{{ launch.details }}</div>
      </div>
    </div>
```

```css
    /* TODO 7: Style the launches list*/
    .content {
      border: solid 1px #ddeeee;
      border-collapse: collapse;
      border-spacing: 0;
      font: normal 13px Arial, sans-serif;
      .items-header {
        display: flex;
        .hcell {
          background-color: #ddefef;
          border: solid 1px #ddeeee;
          color: #336b6b;
          padding: 10px;
          text-align: center;
          text-shadow: 1px 1px 1px #fff;
          // TODO 7: Fixing the width is not a good practise, flex this out a bit ;)
          width: 150px;
        }
      }
      .item-row {
        display: flex;
        .rcell {
          border: solid 1px #ddeeee;
          color: #333;
          padding: 10px;
          text-shadow: 1px 1px 1px #fff;
          // TODO 7: Fixing the width is not a good practise, flex this out a bit ;)
          width: 150px;
          text-align: center;
          .active {
            color: green;
          }

          .inactive {
            color: red;
          }
        }
      }
    }
```

```html
<!-- TODO 8: To navigate among the rockets -->
<div class="toolbar">
  <button><i class="fa fa-arrow-left" aria-hidden="true"></i></button>
  <button><i class="fa fa-arrow-right" aria-hidden="true"></i></button>
</div>
```

```css
/* TODO 8: To navigate among the rockets */
.toolbar {
  display: flex;
  justify-content: flex-end;
  button {
    height: 30px;
    width: 60px;
    box-shadow: 0 3px 10px -2px rgba(0, 0, 0, 0.2);
    border-radius: 3px;
    background-color: #1976d2;
    color: #fff;
    border: 0;
    text-align: center;
    cursor: pointer;
    &:nth-child(2n) {
      margin-left: 10px;
    }
  }
}
```
