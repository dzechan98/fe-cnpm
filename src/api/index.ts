import axios from "axios";

const baseURL = "https://clbtinhocued.me";

const axiosClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export interface ListResponseProduct {
  products: Product[];
  current_page: number;
  total_pages: number;
  total_rows: string;
}

export interface Category {
  MaDanhMuc: string;
  TenDanhMuc: string;
}

interface HinhAnhChiTiet {
  MaHinhAnh: string;
  DuongDan: string;
}

interface HinhAnh {
  DuongDan: string;
  ChiTiet: HinhAnhChiTiet[];
}

export interface Product {
  MaSanPham: string;
  TenSanPham: string;
  Gia: string;
  GiaSauGiam: string;
  DaBan: string;
  SoLuongConLai: string;
  TenDanhMuc: string;
  MoTa: string;
  HinhAnh: HinhAnh;
  Size: {
    MaSize: string;
    Size: string;
  }[];
  MauSac: {
    MaMauSac: string;
    MauSac: string;
  }[];
  PhanTramGiam: string;
}

export interface OrderPayload {
  items: {
    MaSanPham: string;
    SoLuong: number;
    MaMauSac: string;
    MaSize: string;
  }[];
}

export interface LoginPayload {
  Email: string;
  MatKhau: string;
}

export const getListProduct = async (
  page: number,
  tendanhmuc: string,
  tensanpham: string
) => {
  const data = await axiosClient.get<ListResponseProduct>("/index.php", {
    params: { page, tendanhmuc, tensanpham },
  });
  return data.data;
};

export const getListCategory = async () => {
  const data = await axiosClient.get<Category[]>("/danhmuc.php");
  return data.data;
};

export const createOrder = async (payload: OrderPayload) => {
  const data = await axiosClient.post<{ message: string }>(
    "/dathang.php",
    payload,
    { withCredentials: true }
  );

  return data.data;
};
