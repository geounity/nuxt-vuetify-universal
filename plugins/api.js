import trae from 'trae'
import configService from './config'

const apiGeounity = trae.create({
  baseUrl: configService.apiUrl
})

export default apiGeounity
