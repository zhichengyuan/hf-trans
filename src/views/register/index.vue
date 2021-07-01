<template>
  <div class="register">
    <div class="content">
      <div class="reg-sign">
        <el-row :gutter="10">
          <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
            <div class="grid-content bg-purple"></div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <div class="grid-content bg-purple-light">
              <h2 style="text-align: center">
                Регистрация нового пользователя
              </h2>
              <el-form
                ref="dataForm"
                :rules="rules"
                :model="temp"
                label-position="top"
                label-width="150px"
              >
                <el-form-item label="Выбор языка" prop="language">
                  <el-select v-model="temp.language" placeholder="Выберите">
                    <el-option
                      v-for="item in userLanguage"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <!-- <el-form-item label="Название пригласившего магазина" prop="sid">
                  <el-input v-model="temp.sid"  />
                </el-form-item> -->

                <div>
                  <el-form-item label="имя пользователя" prop="username">
                    <el-input v-model="temp.username" />
                  </el-form-item>
                </div>

                <el-form-item label="пароль" prop="password">
                  <el-input v-model="temp.password" type="password" />
                </el-form-item>
                <el-form-item label="Подтвердите Пароль" prop="checkPass">
                  <el-input v-model="temp.checkPass" type="password" />
                </el-form-item>
                <el-form-item label="Телефон" prop="tel">
                  <el-input v-model="temp.tel" type="text" />
                </el-form-item>
                <div>
                  <el-form-item label="Адрес" prop="address">
                    <el-input type="text" v-model="temp.address" />
                  </el-form-item>
                </div>
                <div v-if="part != 'vip'">
                  <el-form-item label="Номер паспорта" prop="passport">
                    <el-input type="text" v-model="temp.passport" />
                  </el-form-item>
                </div>
                <el-form-item label="прозвище">
                  <el-input v-model="temp.nickname" />
                </el-form-item>
                <el-form-item label="замечания">
                  <el-input v-model="temp.remark" />
                </el-form-item>
              </el-form>

              <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="saveUserData(temp)"
                  >зарегистрированный</el-button
                >
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- 弹框 -->
    <!-- <div class="content">
      <div class="reg-sign">
        <el-row :gutter="10">
          <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
            <div class="grid-content bg-purple"></div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <el-dialog :visible.sync="dialogVisible" :before-close="handleClose">
              <h3 style="text-align:center">Поздравляем, регистрация прошла успешно</h3>
              <el-form :model="formLabelAlign">
                <el-form-item label="Название магазина">
                  <el-input v-model="formLabelAlign.store"></el-input>
                </el-form-item>
                <el-form-item label="Имя пользователя (аккаунт)">
                  <el-input v-model="formLabelAlign.name"></el-input>
                </el-form-item>
                <el-form-item label="пароль">
                  <el-input v-model="formLabelAlign.pass"></el-input>
                </el-form-item>
              </el-form>
              <h3
                style="text-align:center;color:red"
              >Используйте пароль учетной записи для входа в магазин</h3>
            </el-dialog>
          </el-col>
        </el-row>
      </div>
    </div> -->
  </div>
</template>

<script>
import { save as saveuser, getuser, register } from '@/api/user'
export default {
  name: 'register',
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Пожалуйста введите пароль'))
      } else if (
        /^(?=.*[a-zA-Z])(?=.*[0-9])[A-Za-z0-9]{6,12}$/.test(value) == false
      ) {
        callback(
          new Error(
            'Состоит из букв и цифр, с учетом регистра, длина ограничена 6–12'
          )
        )
      } else {
        if (this.temp.checkPass !== '') {
          this.$refs.dataForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Пожалуйста, введите пароль еще раз'))
      } else if (value !== this.temp.password) {
        callback(new Error('Два пароля не совпадают!'))
      } else {
        callback()
      }
    }
    return {
      part: '',
      // formLabelAlign: {
      //   store: '',
      //   name: '',
      //   pass: '',
      // },
      // dialogVisible: false,
      userLanguage: [
        {
          value: 'ru',
          label: 'ru',
        },
        {
          value: 'cn',
          label: 'cn',
        },
      ],
      parentId: '',
      temp: {
        rol: '',
        parent: '',
        roles: [],
        address: '',
        passport: '',
        remark: '',
        nickname: '',
        tel: '',
        username: '',
        language: '',
        password: '',
        checkPass: '',
        status: 'active',
      },
      rules: {
        sid: [
          {
            required: true,
            message: 'Пожалуйста, введите вашего приглашающего',
            trigger: 'blur',
          },
        ],
        password: [
          {
            required: true,
            message: 'Пароль не может быть пустым ',
            trigger: 'blur',
          },
          { validator: validatePass, trigger: 'change' },
        ],
        checkPass: [
          {
            required: true,
            message: 'Пароль не может быть пустым ',
            trigger: 'blur',
          },
          { validator: validatePass2, trigger: 'change' },
        ],
        language: [
          {
            required: true,
            message: 'Пожалуйста, выберите язык',
            trigger: 'change',
          },
        ],

        address: [
          {
            required: true,
            message: 'Пожалуйста, введите адрес',
            trigger: 'blur',
          },
        ],
        passport: [
          {
            required: true,
            message: 'Пожалуйста, введите номер паспорта',
            trigger: 'blur',
          },
          // {
          //  validator: (rule, value, callback) => {
          //     console.log(value, 1111, callback)
          //     if (
          //       /^(?=.*[a-zA-Z])(?=.*[0-9])[A-Za-z0-9]{6,12}$/.test(value) ==
          //       false
          //     ) {
          //       callback(
          //         new Error('Состоит из букв и цифр, с учетом регистра, длина ограничена 6–12')
          //       )
          //     } else {
          //       console.log(true)
          //       callback()
          //     }
          //   },
          //   trigger: 'change',
          // },
        ],
        username: [
          {
            required: true,
            message: 'пожалуйста, введите имя пользователя',
            trigger: 'blur',
          },
          {
            validator: (rule, value, callback) => {
              console.log(value, 1111, callback)
              if (
                /^[a-zA-Z\xa0-\xff_][0-9a-zA-Z\xa0-\xff_]{5,9}$/.test(value) ==
                false
              ) {
                callback(
                  new Error(
                    'Начинается с буквы, специальных символов нет, длина ограничена 6-8'
                  )
                )
              } else {
                console.log(true)
                callback()
              }
            },
            trigger: 'change',
          },
        ],
        tel: [
          {
            required: true,
            trigger: 'blur',
            message: 'Пожалуйста, введите телефон',
          },
          {
            validator: (rule, value, callback) => {
              console.log(value, 1111, callback)
              if (/^\d{11}$/.test(value) == false) {
                callback(new Error('Номер телефона состоит из 11 цифр.'))
              } else {
                console.log(true)
                callback()
              }
            },
            trigger: 'change',
          },
        ],
      },
    }
  },
  created() {
    this.part = window.location.hash.split('?')[1].slice(4)
    console.log(this.part,"rrr")
  },
  mounted() {
    this.getuser()
    console.log(document.cookie, 'aaa')
    
  },

  methods: {
    // 获取cookie

    setCookie(cname, cvalue, exdays) {
      var d = new Date()
      d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000)
      var expires = 'expires=' + d.toUTCString()
      document.cookie = cname + '=' + cvalue + '; ' + expires
    },
    getuser() {
      console.log(window.location.hash.split('?')[1].slice(4))
      let sid = window.location.hash.split('?')[1].slice(4)
      if (sid == 'vip') {
        getuser({ name: sid }).then((res) => {
          if (res.code == 0) {
            console.log(res)
            this.temp.parent = res.data
            this.temp.roles = ['ss']
            this.temp.rol = 'T'
          }
        })
      } else {
        console.log(window.location.search, 'sid')
        this.temp.parent = sid
        this.temp.roles = ['ss']
        this.temp.rol = 'b'
        console.log(this.temp)
      }
    },

    saveUserData(temp) {
      // console.log(temp)
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          console.log(temp)
          if (this.temp.nickname == '') {
            this.temp.nickname = this.temp.username
          }
          register(temp).then((res) => {
            if (res.code == 0) {
              this.$message({
                message: 'Вы успешно зарегистрировались',
                type: 'success',
              })
              this.setCookie("Admin-Token", '', -1)
              this.$router.push({ path: 'www.benelife.ru/tgadmin' })
              this.temp = {
                parent: '',
                roles: [],
                address: '',
                remark: '',
                nickname: '',
                tel: '',
                username: '',
                language: '',
                password: '',
                checkPass: '',
              }
            } else if (res.code == 1) {
              this.$message({
                showClose: true,
                message: res.message,
                type: 'error',
              })
            }
          })
        }
      })
    },
  },
}
</script>

<style>
.el-form-item--medium .el-form-item__content {
  line-height: 20px !important;
}
.el-form--label-top .el-form-item__label {
  padding: 0px;
}
.el-form-item {
  margin-bottom: 15px;
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
/* .bg-purple {
  background: #d3dce6;
} */

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.register {
  position: relative;
  background-color: #fff;
}

.register .content {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  margin: 0 auto;
}

.register .content .reg-sign {
  color: #000;
  font-weight: 400;
  font-size: 16px;
  height: 100%;
  /* box-shadow: 0 0 20px rgba(0, 0, 0, 0.1); */
  position: relative;
  /* border-radius: 8px; */
  box-sizing: border-box;
  width: 100%;
  padding: 0 4%;
  margin: 0 auto;
}

.el-button {
  width: 100%;
}
.el-form-item--medium .el-form-item__content {
  line-height: 50px;
}
</style>