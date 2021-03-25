function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Switch>
        <Route path={Routes.HOME} component={Home} />
      </Switch>
    </Suspense>
  );
}

export default App;
