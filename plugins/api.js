import trae from 'trae'
import configService from './config'

const apiGeounity = trae.create({
  baseUrl: configService.apiUrl
})
apiGeounity.defaults({
  mode: 'no-cors'
})

export default apiGeounity
