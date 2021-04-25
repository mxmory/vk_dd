import { Table, Input, Select, DatePicker } from "antd";
import { useState } from "react";
import moment from "moment";
import "./AdminTable.scss";
import { data } from '../../data';
import { isEmpty } from "lodash";

const { Option } = Select;

export const AdminTable = () => {
  
  const [searchField, setSearchField] = useState("id");
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
  const [searchValue, setSearchValue] = useState("");
  const [period, setPeriod] = useState({ start: null, end: null });

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      sorter: (a, b) => a.id - b.id,
      width: "20%",
    },
    {
      title: "Дата",
      dataIndex: "date",
      width: "20%",
    },
    {
      title: "ФИО",
      dataIndex: "fio",
    },
    {
      title: "Телефон",
      dataIndex: "phone",
    },
  ];

  const initialSearchFields = [
    {
      value: "id",
      title: "ID",
    },
    {
      value: "phone",
      title: "Phone number",
    },
  ];

  const handleTableChange = (pagination, filters, sorter) => {
    console.log(pagination, filters, sorter);
    if (!isEmpty(pagination)) {
      setPagination(pagination);
    }
  };

  const handleSearch = (string) => {
    setSearchValue(string);
  };

  const handleSearchField = (value) => {
    setSearchField(value);
  };

  const getFilteredData = () => {
    const dateInPeriod = (item) => {
      console.log(
        moment(item.date).unix() >= moment(period.start).unix(),
        moment(item.date).unix() <= moment(period.end).unix()
      );
      if (!period.start && !period.end) {
        return true;
      } else {
        return (
          (period.start
            ? moment(item.date).unix() >= moment(period.start).unix()
            : true) &&
          (period.end
            ? moment(item.date).unix() <= moment(period.end).unix()
            : true)
        );
      }
    };
    console.log(data)

    return data.filter(
      (item) =>
        ('' + item[searchField]).toLowerCase().startsWith(searchValue.toLowerCase()) &&
        dateInPeriod(item)
    );
  };

  return (
    <div className="admin-table">
      <div className="admin-table__wrapper">
        <div className="panel">
          <div className="search">
            <h3>Поиск по: </h3>
            <div className="search__wrapper">
              <Select
                value={searchField}
                onChange={(val) => handleSearchField(val)}
              >
                {initialSearchFields.map((item) => (
                  <Option key={item.value} value={item.value}>
                    {item.title}
                  </Option>
                ))}
              </Select>
              <Input onChange={(e) => handleSearch(e.target.value)} />
            </div>
          </div>

          <div className="filters">
            <h3>Фильтры:</h3>

            <div className="filters__wrapper">
              <div className="filters__item">
                <h4>Дата:</h4>
                <DatePicker
                  onChange={(val) =>
                    setPeriod((prev) => ({
                      ...prev,
                      start: moment(val).format("YYYY-MM-DD"),
                    }))
                  }
                />{" "}
                -
                <DatePicker
                  onChange={(val) =>
                    setPeriod((prev) => ({
                      ...prev,
                      end: moment(val).format("YYYY-MM-DD"),
                    }))
                  }
                />
              </div>

              <div className="filters__item">
                <h4>Статус</h4>
                <Select multiple value="Open">
                  <Option value="open">Open</Option>
                  <Option value="closed">Closed</Option>
                </Select>
              </div>
            </div>
          </div>
        </div>
        <Table
          columns={columns}
          rowKey={(record) => record.id}
          dataSource={getFilteredData()}
          pagination={pagination}
          // loading={loading}
          onChange={handleTableChange}
        />
        
      </div>
    </div>
  );
};
