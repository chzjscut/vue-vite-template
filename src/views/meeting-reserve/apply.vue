<template>
  <div class="main-container">
    <div class="main-content">
      <div class="title">会议预定</div>
      <div class="form-content">
        <Form
          ref="formRef"
          :model="formData"
          :rules="rules"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          style="border-bottom: 1px solid #e9e9e9"
        >
          <Row :gutter="24">
            <Col :span="6">
              <FormItem label="会议室">
                <div>{{ detail.name }}</div>
              </FormItem>
            </Col>
            <Col :span="6">
              <FormItem label="容纳人数">
                <div>{{ detail.capacity }}</div>
              </FormItem>
            </Col>
            <Col :span="12">
              <FormItem label="预约人">
                <div>{{ detail.createUserName }}</div>
              </FormItem>
            </Col>
          </Row>
          <Row :gutter="24">
            <Col :span="12">
              <FormItem label="会议内容" name="meetingContent">
                <TextArea placeholder="请输入" v-model:value="formData.meetingContent" />
              </FormItem>
            </Col>
            <Col :span="12">
              <FormItem label="参会人员" name="participants">
                <TextArea placeholder="请输入" v-model:value="formData.participants" />
              </FormItem>
            </Col>
          </Row>
          <FormItem label="会议用途" :wrapper-col="{ span: 7 }" name="meetingPurpose">
            <Select placeholder="请输入" v-model:value="formData.meetingPurpose">
              <SelectOption
                v-for="item in purposeOptions"
                :key="item.dataCode"
                :value="item.dataCode"
                :label="item.name"
                >{{ item.dataValue }}</SelectOption
              >
            </Select>
          </FormItem>
          <FormItem label="会议日期" name="meetingDate">
            <DatePicker
              v-model:value="formData.meetingDate"
              :allow-clear="false"
              :disabled-date="disabledDate"
              @change="getMeetingRecordStatus"
            />
          </FormItem>

          <FormItem :wrapper-col="{ span: 24, style: { marginTop: '30px' } }" name="meetingTimeLst">
            <CheckboxGroup
              style="width: 100%; padding: 0 10px"
              v-model:value="formData.meetingTimeLst"
            >
              <Row type="flex" align="middle" :gutter="[16, 12]">
                <Col :span="3" v-for="(value, name, index) in timeRangeData" :key="name">
                  <div :class="['checkbox-item', value.choose ? '' : 'disabled']">
                    <Checkbox :value="name" :disabled="!value.choose">{{ name }}</Checkbox>
                  </div>
                </Col>
              </Row>
            </CheckboxGroup>
          </FormItem>
        </Form>
        <div class="btn-wrap">
          <Button @click="goBack">取消</Button>
          <Button style="margin-left: 10px" type="primary" :loading="loading" @click="onSubmit"
            >确定</Button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed, watch, ref, toRefs, onMounted, unref, reactive } from 'vue';
  //import type { UnwrapRef } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import {
    Button,
    Form,
    FormItem,
    InputGroup,
    Input,
    DatePicker,
    Select,
    SelectOption,
    CheckboxGroup,
    Checkbox,
    Row,
    Col,
    message,
  } from 'ant-design-vue';
  import Cookies from 'js-cookie';
  import dayjs, { Dayjs } from 'dayjs';
  import Api from '/@/api';

  export default defineComponent({
    name: 'MeetingApply',
    components: {
      Button,
      Form,
      FormItem,
      TextArea: Input.TextArea,
      DatePicker,
      Select,
      SelectOption,
      CheckboxGroup,
      Checkbox,
      Row,
      Col,
    },
    props: {},
    setup(props) {
      const route = useRoute();
      const router = useRouter();
      const loading = ref(false);
      const formRef = ref();
      const id = ref(null);
      const detail = ref({});
      const purposeOptions = ref([]);
      const formData = reactive({
        meetingDate: dayjs(route.query.meetingDate),
      });
      const timeRangeData = ref(null);
      const rules = {
        meetingContent: [{ required: true, message: '请填写会议内容' }],
        participants: [{ required: true, message: '请填写参会人员' }],
        meetingPurpose: [{ required: true, message: '请选择会议用途' }],
        meetingDate: [{ required: true, message: '请选择会议日期' }],
        meetingTimeLst: [{ required: true, message: '请选择会议时间段' }],
      };

      // 查询会议室详情
      const getMeetingRoomById = async (id) => {
        const userInfo = JSON.parse(Cookies.get('userInfo'));
        //console.log(userInfo);
        const res = await Api.meetingRoomController.getMeetingRoomById({ id });
        if (res.code === 200) {
          detail.value = {
            ...res.data,
            createUserName: userInfo.name,
          };
        }
      };

      //查询会议用途字典数据
      const getDictionaryData = async (dataType) => {
        const res = await Api.dictionaryController.listDictionaryValues({
          dataType,
        });
        if (res.code === 200) {
          purposeOptions.value = res.data;
        }
      };

      //查询会议室在特定日期的可预约时间段信息
      const getMeetingRecordStatus = async (meetingDate) => {
        const res = await Api.meetingRecordController.getMeetingRecordStatus({
          roomId: id.value,
          meetingDate: dayjs(meetingDate).format('YYYY-MM-DD'),
        });
        if (res.code === 200) {
          timeRangeData.value = res.data;
        }
      };

      const init = () => {
        const { roomId } = route.query;
        if (roomId) {
          id.value = roomId;
          getMeetingRoomById(roomId);
          getMeetingRecordStatus(formData.meetingDate);
        }
        getDictionaryData('PURPOSE');
      };

      //日期选项中的禁用日期
      const disabledDate = (current) => {
        return current && (current < dayjs().startOf('day') || current > dayjs().add(3, 'month'));
      };

      // 提交
      const onSubmit = () => {
        formRef.value
          .validateFields()
          .then(async (values) => {
            //console.log(values);
            loading.value = true;
            const { meetingDate, ...restValues } = values;
            const res = await Api.meetingRecordController.add({
              meetingRecordRsq: {
                roomId: id.value,
                meetingDate: meetingDate ? dayjs(meetingDate).format('YYYY-MM-DD') : '',
                ...restValues,
              },
            });
            loading.value = false;
            if (res.code === 200) {
              message.success('会议室预约成功');
              router.push('./index');
            }
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      };
      const goBack = () => {
        router.push('./index');
      };

      onMounted(() => {
        init();
      });

      return {
        labelCol: { style: { width: '80px' } },
        wrapperCol: { span: 14 },
        //authCodes: userStore.getAuthCodeList,
        formRef,
        rules,
        detail,
        loading,
        formData,
        purposeOptions,
        timeRangeData,
        disabledDate,
        getMeetingRecordStatus,
        onSubmit,
        goBack,
      };
    },
  });
</script>
<style lang="less" scoped>
  .main-container {
    height: 100%;
    padding: 24px;
    background-color: #f0f2f5;
  }

  .main-content {
    height: 100%;
    background-color: #fff;
  }

  .title {
    padding: 15px 32px;
    font-size: 16px;
    font-weight: bold;
    border-bottom: 1px solid #e9e9e9;
  }

  .form-content {
    padding: 20px 26px;
  }

  .checkbox-item {
    width: 120px;
    line-height: 30px;
    text-align: center;
    background: #f1f4fe;
    border-radius: 2px;
    border: 1px solid #6b94fd;

    &.disabled {
      background: #eeeeee;
      border: 1px solid #dddddd;
    }

    .ant-checkbox-wrapper {
      width: 120px;
      padding-left: 5px;
    }
  }

  .btn-wrap {
    margin-top: 40px;
    text-align: center;
  }
</style>
