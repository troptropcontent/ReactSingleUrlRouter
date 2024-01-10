If you have a React app wich is distributed in different websites (ie several static websites) you do not have access to the server but you need to provide a ReactRouter like experience, with page changes and everything, this packages makes it possible.

This router works within a query_params (of your choice) to allow you navigate within your react app through links and stuff but by staying right inside your current URL. It works with the History API to keep track of pages.

It simply works as follow :

```Ts
<Router queryKey="my_app_path">
  <Routes>
    <Route root path="/articles" component={Articles} />
    <Route path="/article/:id" component={Article} />
  </Routes>
</Router>
```

You can navigates through links like this : 

```Ts
<Button color="primary" onClick={() => navigate("/article/12?color=blue")}>
  see article
</Button>
```

This button will change the value of the my_app_path current url query_params with the new value (`/article/12?color=blue`)
In the accessed page you will have the different params accessible through a useParams hook. 

```Ts
const params = useParams()
// params will return {id: 12, color: 'blue'}
```
