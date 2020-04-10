<template>
<div v-if="isLoaded">
    <router-view></router-view>
</div>

</template>

<script>
import { mapActions, mapMutations } from 'vuex';
import { batchQuery } from '@/api/dataDictionary';

export default {
  data() {
    return {
      isLoaded: false,
      waresType: false,
      batchQuery: false,
    };
  },
  created() {
    const param = { objectCodes: ['station_type'] };
    batchQuery(param).then((BQres) => {
      if (BQres.code === 0) {
        const BQresultOne = BQres.data.station_type.details.map(item => Object.assign({}, {
          value: item.fieldCode,
          label: item.fieldValue,
        }));
        this.setWorkType(BQresultOne);// 作业类型
      } else {
        this.$message.error(BQres.msg);
      }
      this.batchQuery = true;
    });
    // 商品类型
    this.WaresType().then(() => {
      this.waresType = true;
    });
    const dataInit = () => {
      console.log('this.waresType', this.waresType);
      const setTime = setTimeout(dataInit, 100);
      if (this.waresType) {
        this.isLoaded = true;
        clearTimeout(setTime);
      }
    };
    dataInit();
  },
  methods: {

    ...mapActions([
      'WaresType',
    ]),
    ...mapMutations({
      setWorkType: 'SET_WORK_TYPE',
    }),
  },

};
</script>

<style scoped>

</style>

