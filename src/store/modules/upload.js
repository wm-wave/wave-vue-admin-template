const qiniu = require('qiniu-js')
import { getQiniuToken } from '@/api/upload'

const CONFIG = {
    useCdnDomain: true,
    // 上传域名区域
    region: qiniu.region.z2
}
const state = {
    upload_token: '',

    baseSrc: 'http://cdn.dreamacro.com/'
}

const mutations = {}

const actions = {
    updateFile({ commit }, fileData) {
        return new Promise(async resolve => {
            // 原文件，原文件，唯一id
            const { raw: rawFile, name, uid } = fileData

            const { data: upload_token } = await getQiniuToken()

            // putExtra
            const putExtra = {
                fname: name, // 文件原始文件名
                mimeType: null // 对上传文件不做限制
            }

            //  上传创建
            const observable = qiniu.upload(
                rawFile,
                'jmcy_' + uid,
                upload_token,
                putExtra,
                CONFIG
            )

            // 上传开始
            observable.subscribe({
                next: result => {
                    console.log(result, '上传中')
                },
                error: err => {
                    console.log(err)
                },
                complete: res => {
                    const data = res
                    data.key = 'jmcy_' + uid

                    resolve(data)
                }
            })
        })

        // 上传取消
        // subscription.unsubscribe()
        // 获取URL
        // qiniu.getUploadUrl(config, token).then(res => {})
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
