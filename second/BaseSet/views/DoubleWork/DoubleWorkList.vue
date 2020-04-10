<template>
    <div>
        <el-header class="box-inital" height="auto">
          <SearchBox :items="items" :fold="fold" ref="searchBox" @search="searchData" ></SearchBox>
        </el-header>
        <div class="handle-box button-box">
          <el-button type="primary" v-checkAuthBtn authority-node = "add"
           @click="add">新增</el-button>
        </div>
        <el-main class="box-inital">
          <tableBase
            v-if="isLoaded"
            :tableData="tableData"
            :tableTh="tableTh"
            :tableOpt="tableOpt"
            :pageData="pageData"
            :funcOpt="funcOpt"
            :TheScrollBar="TheScrollBar"
            @pageChange="pageChange"
            @tableSelected="tableSelected"
            @tableFuncShow="tableFunc"
            @sort-change="sortChange"
            @edit="edit"
            @del="del"
            >
          </tableBase>
        </el-main>
        <el-dialog title="编辑" :visible.sync="dialogFormVisible">
          <el-form :model="objTemp" :inline="false" label-position="left"
           label-width="110px" ref="formData">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="作业类型" prop="workType" :rules="rules.selectValidate">
                  <el-select v-model="objTemp.workType">
                    <el-option label="请选择" value=""></el-option>
                    <el-option v-for="(item, index) in workType" :key="index"
                      :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="商品分类" prop="waresType" :rules="rules.selectValidate">
                  <el-select v-model="objTemp.waresType">
                    <el-option label="请选择" value=""></el-option>
                    <el-option v-for="(item, index) in waresType" :key="index"
                      :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button  @click="cancel">取 消</el-button>
            <el-button type="primary" @click="save">确 定</el-button>
          </div>
        </el-dialog>
    </div>
</template>

<script>
import { getTable, details, save, deleteIds } from '@/api/doubleWork';
import { mapGetters } from 'vuex';
import SearchBox from '@/libs/SearchBox/v1.0/SearchBox';
import tableBase from '@/libs/TableBase/v1.0/TableBase';
import rules from '@/utils/formValidate';
import { renderSelect } from '@/utils/datatransform';
// import dateFormat from '@/utils/date';

export default {
  data() {
    return {
      fold: true,
      isLoaded: true,
      items: [
        {
          span: 6,
          title: '作业类型',
          name: 'workType',
          type: 'search-select',
          placeholder: '请选择',
          options: [],
          value: '',
          num: 3,
          fade: false,
          rule: rules.inputLen64,
        }, {
          span: 6,
          title: '商品分类',
          name: 'waresTypeId',
          type: 'search-select',
          placeholder: '请选择',
          options: [],
          value: '',
          rule: rules.inputLen,
        }],
      tableOpt: {
        isShowSelection: true,
      },
      TheScrollBar: true,
      pageParams: {},
      tableTh: [],
      tableData: [],
      pageData: {
        pageSize: 10,
        currentPage: 1,
        recordCount: 200,
      },
      funcOpt: {
        label: '操作',
        fixed: 'right',
        width: 180,
        list: [
          {
            label: '编辑',
            event: 'edit',
            authority: 'edit',
          },
          {
            label: '删除',
            event: 'del',
            authority: 'del',
          },
        ],
      },
      dialogFormVisible: false,
      formLabelWidth: '120px',
      objTemp: {
        workType: '',
        waresType: '',
      },
      oriWorkType: '',
      oriWaresType: '',
      doubleWorkConfigId: '',
      rules,
      type: '',
    };
  },
  created() {
    this.tableTh = [
      { prop: 'index', label: '行号', fixed: true, sortable: true },
      { prop: 'workType', label: '作业类型', sortable: true },
      { prop: 'waresTypeName', label: '商品分类', sortable: true },
      { prop: 'creator', label: '创建人', sortable: true },
      { prop: 'creationTime', label: '创建时间', sortable: true },
      { prop: 'modifier', label: '编辑人', sortable: true },
      { prop: 'modifyTime', label: '编辑时间', sortable: true },
    ];
    this.getData();
    this.dataDictionaryFn();
  },
  methods: {
    searchData(searchparams) {
      console.log(searchparams);
      this.pageParams = searchparams;
      const searchData = Object.assign(searchparams, this.pageData);
      this.getTableData(searchData);
    },
    getData() {
      const initparams = this.pageData;
      this.getTableData(initparams);
    },
    pageChange(pageValue) {
      console.log(pageValue);
      const pageParams = this.pageParams;
      const searchData = Object.assign(pageParams, pageValue);
      this.getTableData(searchData);
    },
    getTableData(params) {
      console.log(params);
      getTable(params).then((res) => {
        const data = res.data;
        this.pageData = {
          pageSize: data.pageSize,
          currentPage: data.currentPage,
          recordCount: data.recordCount,
        };
        console.log(this.waresType);
        const dicWaresTypes = [];
        for (let i = 0, l = this.waresType.length; i < l; i += 1) {
          dicWaresTypes[this.waresType[i].value] = this.waresType[i].label;
        }
        console.log(dicWaresTypes);
        this.tableData = data.recordList.map((item, index) => Object.assign(item, {
          index: index + 1,
          workType: this.dict.workType[item.workType],
          waresTypeName: dicWaresTypes[item.waresTypeId],
          creationTime: item.creationTime,
          modifyTime: item.modifyTime,
          // creationTime: dateFormat(item.creationTime),
          // modifyTime: dateFormat(item.modifyTime),
        }));
        console.log(this.tableData);
      });
    },
    tableSelected(value) {
      console.log(value);
    },
    sortChange(val) {
      console.log(val);
    },
    tableFunc(index) {
      console.log(index);
    //   this.showLayer = !this.showLayer;
    //   this.id = index.value.carrierProtocalId;
    },
    newItem() {
    },
    turnToUse() {
    },
    forbid() {
    },
    // 字典接口
    dataDictionaryFn() {
      console.log('海贼王', this.waresType);
      console.log(" 海贼王2", this.waresType);
      renderSelect(this.items, this.waresType, 'waresTypeId', 'value', 'label'); // 商品分类
      renderSelect(this.items, this.workType, 'workType', 'value', 'label'); // 作业类型
    },
    edit(index) {
      console.log(index);
      this.type = 'edit';
      this.dialogFormVisible = true;
      this.doubleWorkConfigId = index.value.doubleWorkConfigId;
      details({ id: index.value.doubleWorkConfigId }).then((res) => {
        const data = res.data;
        this.objTemp.workType = `${data.workType}`;
        this.oriWorkType = `${data.workType}`;
        this.objTemp.waresType = `${data.waresTypeId}`;
        this.oriWaresType = `${data.waresTypeId}`;
      });
    },
    del(index) {
      console.log(index);
      // const param = { ids: `${index.value.doubleWorkConfigId}` };
      // param.ids = `${index.value.doubleWorkConfigId}`;
      console.log(index.value.doubleWorkConfigId);
      this.$confirm('确认删除吗？', '提示', {
        confirmButtonText: '是',
        cancelButtonText: '否',
        type: 'warning',
      }).then(() => {
        deleteIds({ ids: index.value.doubleWorkConfigId }).then((res) => {
          if (res.code === 0) {
            const data = res.data;
            console.log(data);
            this.getData();
            this.dialogFormVisible = false;
            this.$message({
              type: 'success',
              message: '删除成功!',
            });
          }
        });
      });
    },
    add() {
      this.type = 'add';
      this.dialogFormVisible = true;
      this.objTemp.workType = '';
      this.objTemp.waresType = '';
    },
    save() {
      this.$refs.formData.validate((valid) => {
        if (valid) {
          const param = {};
          param.workType = this.objTemp.workType;
          param.waresTypeId = this.objTemp.waresType;
          if (this.type === 'edit') {
            param.doubleWorkConfigId = this.doubleWorkConfigId;
            save(param).then((res) => {
              if (res.code === 0) {
                const data = res.data;
                console.log(data);
                this.getData();
                this.dialogFormVisible = false;
              }
            });
          }
          if (this.type === 'add') {
            save(param).then((res) => {
              if (res.code === 0) {
                const data = res.data;
                console.log(data);
                this.getData();
                this.dialogFormVisible = false;
              }
            });
          }
        }
      });
    },
    cancel() {
      this.dialogFormVisible = false;
    },

  },
  computed: {
    ...mapGetters([
      'dict',
      'waresType',
      'workType',
    ]),
  },
  components: {
    SearchBox,
    tableBase,
  },
};
</script>

<style scoped>
.handle-box{
  /* float: right; */
  margin: 20px 0;
}
.box-inital {
  background: #fff;
  border-radius: 5px;
  padding: 0;
  margin-bottom: 10px;
  box-shadow: 1px 1px 5px 2px #e5ebf3;
}
.button-box{
    text-align: right
}
</style>

