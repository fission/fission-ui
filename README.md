# Fission UI

Fission-ui is a web-based UI for [fission](https://github.com/fission/fission).
It allows users to observe manage fission, 
providing a simple online development environment for serverless functions powered by fission.

## Features
- Deploy with fission easily
- A overview of all functions and triggers related
- Test and see the response of the function right from the editor
- A draft function test mode let you test the function in your editor without affect the online version

## Running fission-ui

### Deploy Fission-ui with other fission services
After deploying fission services, create a fission-ui service and deployment:
```
$ kubectl create -f docker/fission-ui.yaml
```
You can then access the ui via `node_ip:31319` or the load balancer.

### Manage fission environments

### Observe function status

### Check, edit, test and deploy functions

### Manage all kinds of triggers related to functions

Currently http triggers and kube watchers only.

### Manage fission environments

### More features to come

Fission-ui will update as fission evolves.
- Observe and manage function logs, versions and statics
- Control function runtime resources
- Fission environment v2

## Development

Fission-ui is created from [react-boilerplate](https://github.com/react-boilerplate/react-boilerplate).
It is a single page application and uses react, redux, react-saga.
Fission-ui is under rapid development as fission, so feel free to get the code and play with it.

1. Clone this repo using `git clone https://github.com/fission/fission-ui`
1. Run `npm run setup` or `npm install` to install dependencies
1. `export FISSION_ROUTER=$SERVER_IP:31313` and `export FISSION_CONTROLLER=$SERVER_IP:31314`
1. Run `npm run start` to see the app at `http://localhost:3000`
1. Run `npm run build` to build the application into the build folder
1. Run `cd docker && ./push.sh $DOCKER_HUB_NAME $TAG` to build docker image and push to docker hub

## License

The work done has been licensed under Apache License 2.0.
