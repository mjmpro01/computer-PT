const InfoTable = () => {
  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Thông tin chung</h2>
      <table className="min-w-full text-left text-gray-800">
        <tbody>
          <tr>
            <td className="font-medium">Thương hiệu</td>
            <td>XIGMATEK</td>
          </tr>
          <tr>
            <td className="font-medium">Bảo hành</td>
            <td>12 tháng</td>
          </tr>
          <tr>
            <td className="font-medium">Tên của case</td>
            <td>Alphard M 3GF</td>
          </tr>
          <tr>
            <td className="font-medium">Part-number</td>
            <td>EN44090</td>
          </tr>
          <tr>
            <td className="font-medium">Nhu cầu</td>
            <td>Gaming</td>
          </tr>
          <tr>
            <td className="font-medium">Màu sắc</td>
            <td>Đen</td>
          </tr>
          <tr>
            <td className="font-medium">Chất liệu</td>
            <td>Thép</td>
          </tr>
          <tr>
            <td className="font-medium">Chất liệu nắp hông</td>
            <td>Kính cường lực</td>
          </tr>
          <tr>
            <td className="font-medium">Kích thước</td>
            <td>364 x 212 x 438 mm</td>
          </tr>
        </tbody>
      </table>

      <h2 className="text-lg font-semibold mt-6 mb-4">Cấu hình chi tiết</h2>
      <table className="min-w-full text-left text-gray-800">
        <tbody>
          <tr>
            <td className="font-medium">Loại case</td>
            <td>Mini Tower</td>
          </tr>
          <tr>
            <td className="font-medium">Hỗ trợ mainboard</td>
            <td>Micro-ATX, ITX</td>
          </tr>
          <tr>
            <td className="font-medium">Số lượng ổ đĩa hỗ trợ</td>
            <td>1 x 3.5", 1 x 2.5"</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default InfoTable;
