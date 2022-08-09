<template>
  <div class="main-container">
    <div class="filter-header">
      <Form layout="inline" :model="query" :wrapper-col="wrapperCol">
        <FormItem label="" :wrapper-col="{ style: { minWidth: '180px' } }">
          <InputGroup compact>
            <Select
              allowClear
              placeholder="全部"
              v-model:value="query.floor"
              @change="
                (value) => {
                  query.roomId = null;
                  onSearch();
                  getMeetingRoomsByFloor(value);
                }
              "
            >
              <SelectOption
                v-for="item in FLOOR_options"
                :key="item.dataCode"
                :value="item.dataCode"
                >{{ item.dataValue }}</SelectOption
              >
            </Select>
            <Select
              placeholder="会议室名称"
              v-model:value="query.roomId"
              allow-clear
              show-search
              optionFilterProp="label"
              style="min-width: 110px"
              @change="onSearch"
            >
              <SelectOption
                v-for="item in roomOptions"
                :key="item.id"
                :value="item.id"
                :label="item.name"
                >{{ item.name }}</SelectOption
              >
            </Select>
          </InputGroup>
        </FormItem>
        <FormItem>
          <Select
            v-model:value="query.capacity"
            placeholder="容纳人数"
            allow-clear
            @change="onSearch"
          >
            <SelectOption
              v-for="item in CAPACITY_options"
              :key="item.dataCode"
              :value="item.dataCode"
              >{{ item.dataValue }}</SelectOption
            >
          </Select>
        </FormItem>
        <FormItem label="选择日期" name="date">
          <DatePicker
            v-model:value="query.meetingDate"
            :allow-clear="false"
            :disabled-date="disabledDate"
            @change="onSearch"
          />
        </FormItem>
      </Form>
    </div>

    <div class="main-content">
      <div class="checkable-row">
        <Checkbox v-model:checked="query.idIdle" @change="onSearch">可预约</Checkbox>
      </div>
      <template v-if="tableData.length > 0">
        <div class="item-row" v-for="(room, index) in tableData" :key="room.id">
          <div class="item-title">
            <Row type="flex" align="middle" justify="space-between" :wrap="false" :gutter="16">
              <Col flex="0 0 35%">
                <Row :gutter="16" :wrap="false" v-if="false">
                  <Col :span="12">
                    <TypographyText
                      ellipsis
                      :content="room.name + (room.floor ? `（${room.floor}）` : '')"
                      class="name"
                    />
                  </Col>
                  <Col :span="12">
                    <TypographyText
                      ellipsis
                      :content="room.location"
                      class="common"
                      v-if="room.location"
                    />
                  </Col>
                </Row>
                <span class="name">{{ room.name + (room.floor ? `（${room.floor}）` : '') }}</span>
                <span class="common" v-if="room.location">位置：{{ room.location }}</span>
              </Col>
              <Col flex="1">
                <span class="common">{{ room.equipment }}</span>
              </Col>
              <Col flex="1">
                <span class="common">{{ room.capacity }}</span>
              </Col>
              <Col flex="1">
                <!-- <span class="common" v-if="room.isOpen === 0">封禁时间：{{ room.banStartTime }} ~ {{ room.banEndTime }}</span> -->
                <span
                  class="common"
                  v-if="
                    room.approverName &&
                    !isCurrentDateBan(room.isOpen, room.banStartTime, room.banEndTime)
                  "
                  >审批人：{{ room.approverName }}</span
                >
              </Col>
              <Col flex="110px">
                <template v-if="isCurrentDateBan(room.isOpen, room.banStartTime, room.banEndTime)">
                  <Tag color="error" style="margin-right: 3px">
                    <template #icon>
                      <CloseCircleOutlined />
                    </template>
                    封禁中
                  </Tag>
                  <Tooltip placement="top">
                    <template #title>
                      <div>封禁时间：{{ room.banStartTime }} ~ {{ room.banEndTime }}</div>
                      <div>封禁原因：{{ room.banRemark }}</div>
                    </template>
                    <QuestionCircleOutlined />
                  </Tooltip>
                </template>
                <Tag color="blue" v-else-if="room.approvalSetting !== 1">需要审批</Tag>
              </Col>
              <Col flex="110px">
                <Button type="primary" @click="toApply(room.id)" :disabled="!room.reserve"
                  >+ 预约</Button
                >
              </Col>
            </Row>
          </div>

          <div class="item-content">
            <Row type="flex" align="middle" :gutter="[16, 12]">
              <Col :span="3" v-for="(value, name, _index) in room.reserveDate" :key="name">
                <Tooltip placement="top" :title="tooltipInfo(value)">
                  <div :class="['box-item', value.choose ? '' : 'disabled']">{{ name }}</div>
                </Tooltip>
              </Col>
            </Row>
          </div>
        </div>

        <Pagination
          class="pagination-row"
          :current="pagination.current"
          :pageSize="pagination.pageSize"
          :pageSizeOptions="pagination.pageSizeOptions"
          :showQuickJumper="pagination.showQuickJumper"
          :showSizeChanger="pagination.showSizeChanger"
          :showTotal="pagination.showTotal"
          :total="pagination.total"
          @change="pagination.onChange"
        />
      </template>
      <div class="empty-wrap" v-else>
        <Empty />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, computed, watch, ref, toRefs, onMounted, unref, reactive } from 'vue';
  //import type { UnwrapRef } from 'vue';
  import { useRouter } from 'vue-router';
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
    Tag,
    Pagination,
    Tooltip,
    Empty,
    TypographyText,
  } from 'ant-design-vue';
  import { CloseCircleOutlined, QuestionCircleOutlined } from '@ant-design/icons-vue';
  import dayjs, { Dayjs } from 'dayjs';
  import Api from '/@/api';
  //import { useUserStore } from '/@/store/modules/user';

  export default defineComponent({
    name: 'MeetingReserve',
    components: {
      CloseCircleOutlined,
      QuestionCircleOutlined,
      Button,
      Form,
      FormItem,
      InputGroup,
      DatePicker,
      Select,
      SelectOption,
      Checkbox,
      Row,
      Col,
      Tag,
      Pagination,
      Tooltip,
      Empty,
      TypographyText,
    },
    props: {},
    setup(props) {
      const router = useRouter();
      //const userStore = useUserStore();

      const optionSet = reactive({
        CAPACITY_options: [],
        FLOOR_options: [],
        roomOptions: [],
      });
      const formRef = ref();
      const query = ref({
        floor: undefined,
        roomId: undefined,
        capacity: undefined,
        meetingDate: dayjs(),
        idIdle: true,
      });
      const tableData = ref([]);

      const sortParams = ref({
        orderByColumn: 'quoteCount',
        orderByBdir: 'desc',
      });
      const queryChange = (values, isSortReset = false) => {
        query.value = {
          ...query.value,
          ...values,
        };

        if (isSortReset) {
          sortParamsChange({
            orderByColumn: 'weight',
          });
        }
      };
      const sortParamsChange = (values) => {
        sortParams.value = {
          ...sortParams.value,
          ...values,
        };
      };

      const pagination = reactive({
        pageSize: 50,
        current: 1,
        pageSizeOptions: ['10', '20', '50', '100'],
        showQuickJumper: true,
        showSizeChanger: true,
        showTotal: (total, range) => {
          return `共${total}条`;
        },
        total: 0,
        onChange: (page, pageSize) => {
          console.log(page, pageSize);
          pagination.current = page;
          pagination.pageSize = pageSize;
          getMeetingReserveData();
        },
      });
      const { pageSize, current } = toRefs(pagination);

      //所有字典数据获取
      const getDictionaryData = () => {
        const dictionaryList = ['CAPACITY', 'FLOOR'];
        const promiseList = dictionaryList.map((dataType) => {
          return Api.dictionaryController.listDictionaryValues({
            dataType,
          });
        });
        Promise.all(promiseList).then((resList) => {
          resList.forEach((res, index) => {
            if (res.code === 200) {
              //console.log(res.data);
              optionSet[`${dictionaryList[index]}_options`] = res.data;
            }
          });
        });
      };
      //根据楼层查询会议室
      const getMeetingRoomsByFloor = async (floor = null) => {
        const res = await Api.meetingRoomController.getMeetingRoomByRoomNameAndCapacity({
          floor,
        });
        if (res.code === 200) {
          optionSet.roomOptions = res.data;
        }
      };

      // 查询会议室可预约情况列表
      const getMeetingReserveData = async () => {
        const { meetingDate, ...restData } = query.value;
        const res = await Api.meetingRecordController.getTop({
          current: current.value,
          limit: pageSize.value,
          meetingDate: meetingDate ? dayjs(meetingDate).format('YYYY-MM-DD') : '',
          ...restData,
        });
        if (res.code === 200) {
          const { records, total } = res.data;
          tableData.value = records;
          pagination.total = total;
        }
      };

      //日期选项中的禁用日期
      const disabledDate = (current) => {
        return current && (current < dayjs().startOf('day') || current > dayjs().add(3, 'month'));
      };

      //当前日期是否封禁
      const isCurrentDateBan = (isOpen, banStartTime, banEndTime) => {
        return (
          isOpen === 0 &&
          query.value.meetingDate >= dayjs(banStartTime).startOf('day') &&
          query.value.meetingDate <= dayjs(banEndTime).startOf('day')
        );
      };

      //禁用时间段提示信息
      const tooltipInfo = (info) => {
        if (info.choose || !info.hasOwnProperty('state')) return null;
        return (
          `${info.state} ${info.createUserName}` + (info.jobNumber ? `(${info.jobNumber})` : '')
        );
      };

      const onSearch = () => {
        //重置分页
        pagination.current = 1;
        pagination.pageSize = 50;
        getMeetingReserveData();
      };

      // 跳转到预约页面
      const toApply = (roomId) => {
        const meetingDate = dayjs(query.value.meetingDate).format('YYYY-MM-DD');
        router.push({
          path: './apply',
          query: {
            roomId,
            meetingDate,
          },
        });
      };

      onMounted(() => {
        getDictionaryData();
        getMeetingRoomsByFloor();
        onSearch();
      });

      return {
        formRef,
        wrapperCol: { style: { width: '140px' } },
        ...toRefs(optionSet),
        query,
        sortParams,
        tableData,
        pagination,
        getMeetingRoomsByFloor,
        onSearch,
        disabledDate,
        queryChange,
        sortParamsChange,
        toApply,
        isCurrentDateBan,
        tooltipInfo,
      };
    },
  });
</script>
<style lang="less" scoped>
  .ml-10 {
    margin-left: 10px;
  }

  .ml-20 {
    margin-left: 20px;
  }

  .main-container {
    height: 100%;
    padding: 24px;
    background-color: #f0f2f5;
  }

  .filter-header {
    padding: 10px 24px;
    background-color: #fff;
    border-radius: 2px;
  }

  .main-content {
    position: relative;
    height: calc(100% - 76px);
    margin-top: 24px;
    background-color: #fff;
    border-radius: 2px;
  }

  .checkable-row {
    padding: 15px 20px;
    text-align: right;
  }

  .item-row {
    padding: 0 24px;
    border-bottom: 1px solid #e9e9e9;
  }

  .item-title {
    padding: 16px 0;
    border-bottom: 1px dashed #e9e9e9;

    .name {
      font-size: 16px;
      font-weight: bold;
    }

    .common {
      font-size: 16px;
      color: #666;
    }
  }

  .tags-col {
    span + span {
      margin-left: 30px;
    }
  }

  .item-content {
    padding: 18px 0 16px;
  }

  .box-item {
    width: 100px;
    line-height: 30px;
    text-align: center;
    background: #f1f4fe;
    border-radius: 2px;
    border: 1px solid #6b94fd;

    &.disabled {
      background: #eeeeee;
      border: 1px solid #dddddd;
    }
  }

  .empty-wrap {
    position: absolute;
    top: 40%;
    left: 0;
    width: 100%;
  }

  .pagination-row {
    padding: 10px 24px;
    text-align: right;
  }
</style>
