<template>
  <div>
    <div class="content row-flex">
      <span>古猫技术部</span>
    </div>
    <demo></demo>

    {{#upload}}
    <upload 
      :action="upload.action"
      :headers="upload.headers"
      :data="upload.data"
      :name="upload.name"
      :prefix="upload.prefix"
      :limit="upload.limit"
      :accepts="upload.accepts"
      :multiple="upload.multiple"
      :queue="upload.queue"
      @change="upload.change"
      @progress="upload.progress"
      @success="upload.success"
      @error="upload.error">
      <div class="icon"><i class="iconfont icon-plus-thin"></i></div>
      <div class="txt">上传照片</div>
    </upload>
    {{/upload}}
  </div>
</template>

<script>
import Demo from '../components/Demo'
{{#upload}}
import Upload from '../components/Upload'
{{/upload}}
export default {
  components: {Demo{{#upload}}, Upload{{/upload}}},
  data () {
    return {
      {{#upload}}
      upload: {
        action: "http://up-z0.qiniu.com",
        headers: {"Accept":"application/json; charset=utf-8"},
        name: "file",
        prefix: 'act_',
        data: {
          unique_names: true,
          token: '',
        },
        limit: 20, //20MB
        accepts: ["image/*"],
        multiple: true,
        queue: true,
        change: (files) => {
          for (let i in files){
            let key = files[i].key;
            let index = this.uploadedkeys.indexOf(key);
            if (index == -1) {
              this.uploadedkeys.push(key);
              this.uploaded.push({percent: 0, key: key});
            }
          }
        },
        progress: (progress) => {
          let index = this.uploadedkeys.indexOf(progress.key);

          this.uploaded[index] = progress;
          this.$set(this.uploaded, index, this.uploaded[index]);
        },
        success: (result) => {
          let key = result.key;
          let index = this.uploadedkeys.indexOf(key);
          this.uploaded[index].percent = 101;
          this.uploaded[index].resource = this.tmp_resource;
          this.$set(this.uploaded, index, this.uploaded[index]);
        },
        error: (type, result) => {
          if (type == "limit") {
            for (let file of result) {
              common.alert("超过上传上限",file["type"],file["name"],(file["size"]/1024/1024).toFixed(2)+"MB")  
            }
          }
          if (type == "empty") {
            common.alert("请选择文件")
          }
          if (type == "server") {
            common.alert("服务器繁忙")
          }
        },
      },
      uploadedkeys: [],
      uploaded:[]
      {{/upload}}
    }
  }{{#upload}},
  methods: {
    initUpload () {
      ajax.get("qiniu/getUpToken", {}).then(res => {
        if (res.code==0 && res.data.uptoken) {
          this.upload.data.token = res.data.uptoken;
        }else {
          common.alert(res.msg);
        }
      });
    },
  },
  created() {
    this.initUpload();
  }
  {{/upload}}
}
</script>

<style scoped>
.content {width:100%; height:100%; font-size:28px; padding-top:20px;}
</style>
