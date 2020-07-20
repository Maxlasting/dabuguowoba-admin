import { request, createRequest } from '@request/create-request'

const methods = [ 'get', 'post' ]

const net = {}

for (let item of methods) {
  net[item] = (url, ...args) => createRequest(request[item](url, ...args))
}

export default net
