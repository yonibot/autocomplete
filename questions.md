1. What is the difference between Component and PureComponent? give an example where it might break my app.
2. Context + ShouldComponentUpdate might be dangerous. Can think of why is that?
3. Describe 3 ways to pass information from a component to its PARENT.
4. Give 2 ways to prevent components from re-rendering.
5. What is a fragment and why do we need it? Give an example where it might break my app.
6. Give 3 examples of the HOC pattern.
7. what's the difference in handling exceptions in promises, callbacks and async...await.
8. How many arguments does setState take and why is it async.
9. List the steps needed to migrate a Class to Function Component.
10. List a few ways styles can be used with components.
11. How to render an HTML string coming from the server.


1. PureComponent is an optimization that React provides out of the box to prevent re-renders of components in the event that props have not changed. It can be useful when there’s either very deeply nested nodes or nodes that are re-rendered in the tree with an expensive rendering (which I believe is what the question is referring to in terms of breaking an app).
2. Context passes info down the tree and relies on components re-rendering for information to pass through. Preventing rendering with shouldComponentUpdate would stop child components from updating, which would, I guess, prevent Context from working.
3. Three ways to pass info from component to parent-
    1. Passing down a callback that updates, say, a state object within the parent component, as a prop.
    2. Wrap the children in a Provider. Include a callback to update the parent state. Have the child call useContext to consume the context, and then the child would call the callback to pass the data up.
    3. As a more esoteric option, you could add an event listener for a custom event on the parent component, and have the event triggered from the child component. Then it would bubble up the tree, reaching the parent.
4. Back in the day, we would use `shouldComponentUpdate` and return false if we wanted to prevent a render. A more modern way is wrapping a component in `memo`, which would limit re-rendering to whether the component’s own props have changed.
5. A Fragment is basically a placeholder that renders nothing on the DOM. A common use is to handle a situation where you have multiple children, since React components must return single nodes. If you wrap multiple children in a Fragment, problem solved. I’m not sure where a fragment would break an app.
6. I'm low on time and I haven't used HOCs in ages, but I've used the HOC patttern a long time ago, before the age of hooks, I believe once for breadcrumbs - I created a new HOC that contained logic for caculating breadcumbs, and supplied the current component.
7. With async/await, exceptions are handle with try & catch, and with traditional promise callbacks, they’re handled with {promise}.catch(err => …)
8. It feels like this test is a bit antiquated (or a lot of Deel’s code still uses Class components), and I’m not sure if you mean to ask about setState rather than useState. useState has 1 argument, but setState took 2 arguments - the current state or an updater fn, if I recall correctly, and a callback to run once the state has been updated. It’s async because React can batch multiple state updates before re-rendering.
9. I honestly have not done this in years, but, if I recall-
    1. Change from class to function
    2. Use the new React hooks rather than the old function calls (like setState becomes useState, etc)
    3. There’s no longer a render() method to implement -> the render just becomes a return statement.
    4. Lifecycle methods work a little differently, mostly replaced by useEffect with or without dependencies.
10. There are a number of ways to style components with React. I quite like using Styled Components, which takes your CSS and generates a custom class for each component (while putting the styles into the head of the document). You can also use regular CSS, or SASS for some extra support (like nested styling).
11. <div dangerouslySetInnerHTML={{ __html: <div>This is risky!</div>} />

